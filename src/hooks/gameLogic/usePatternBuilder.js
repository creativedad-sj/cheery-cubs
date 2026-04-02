import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, patternThemes, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const patternRecipes = {
  1: [
    { id: 'ab-middle', title: 'Build the train', hint: 'This little part repeats', sequence: [0, 1, 0, 1], rule: [0, 1], missingIndexes: [2] },
    { id: 'ab-end', title: 'Finish the necklace', hint: 'This pair repeats again and again', sequence: [0, 1, 0, 1], rule: [0, 1], missingIndexes: [3] }
  ],
  2: [
    { id: 'aab', title: 'Finish the pattern', hint: 'See the repeat: two the same, then one more', sequence: [0, 0, 1, 0, 0, 1], rule: [0, 0, 1], missingIndexes: [2] },
    { id: 'abb', title: 'Build the next part', hint: 'See the repeat: one, then two the same', sequence: [0, 1, 1, 0, 1, 1], rule: [0, 1, 1], missingIndexes: [3] }
  ],
  3: [
    { id: 'abc', title: 'Complete the parade', hint: 'Three different pieces repeat in order', sequence: [0, 1, 2, 0, 1, 2], rule: [0, 1, 2], missingIndexes: [2, 5] },
    { id: 'aabc', title: 'Finish the big pattern', hint: 'Two the same, then two different', sequence: [0, 0, 1, 2, 0, 0, 1, 2], rule: [0, 0, 1, 2], missingIndexes: [2, 7] }
  ]
};

function buildSlots(theme, recipe) {
  return recipe.sequence.map((itemIndex, index) => {
    const item = theme.items[itemIndex];
    const hidden = recipe.missingIndexes.includes(index);

    return {
      id: `${item.id}-${index}`,
      expectedItemId: item.id,
      item: hidden ? null : item,
      hidden
    };
  });
}

export function usePatternBuilder() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [themeName, setThemeName] = useState('');
  const [title, setTitle] = useState('Build the pattern');
  const [hint, setHint] = useState('');
  const [ruleItems, setRuleItems] = useState([]);
  const [groupSize, setGroupSize] = useState(2);
  const [slots, setSlots] = useState([]);
  const [trayItems, setTrayItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const difficulty = getDifficulty('pattern-builder');
  const speakRef = useRef(speak);
  const trayMapRef = useRef({});

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  useEffect(() => {
    trayMapRef.current = Object.fromEntries(trayItems.map((item) => [item.id, item]));
  }, [trayItems]);

  const clearRoundTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearRoundTimer, [clearRoundTimer]);

  const nextRound = useCallback(() => {
    clearRoundTimer();

    const availableRecipes = patternRecipes[difficulty] || patternRecipes[1];
    const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
    const theme = patternThemes[Math.floor(Math.random() * patternThemes.length)];
    const nextSlots = buildSlots(theme, recipe);
    const nextRuleItems = recipe.rule.map((itemIndex) => theme.items[itemIndex]);

    setThemeName(theme.name);
    setTitle(recipe.title);
    setHint(recipe.hint);
    setRuleItems(nextRuleItems);
    setGroupSize(recipe.rule.length);
    setSlots(nextSlots);
    setTrayItems(shuffle(theme.items));
    setSelectedItemId(null);
    setFeedback({ show: false, type: '', message: '' });
    setShakeId(null);
    setShowConfetti(false);

    speakRef.current(`${recipe.title}. ${recipe.hint}.`, 'question');
  }, [clearRoundTimer, difficulty]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleTrayPress = useCallback((item) => {
    setSelectedItemId((prev) => (prev === item.id ? null : item.id));
  }, []);

  const handleSlotPress = useCallback(async (slot) => {
    if (!slot.hidden || !selectedItemId) {
      return;
    }

    const selectedItem = trayMapRef.current[selectedItemId];

    if (!selectedItem) {
      return;
    }

    if (selectedItem.id === slot.expectedItemId) {
      const nextSlots = slots.map((entry) =>
        entry.id === slot.id ? { ...entry, hidden: false, item: selectedItem } : entry
      );

      setSlots(nextSlots);
      setSelectedItemId(null);

      const solved = nextSlots.every((entry) => !entry.hidden);
      if (solved) {
        const phrase = getRandomPhrase(correctPhrases);
        const nextStats = getProjectedStats('pattern-builder', true);

        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: phrase });
        recordAttempt('pattern-builder', true);
        speak(phrase, 'effect');

        clearRoundTimer();
        timeoutRef.current = setTimeout(() => {
          checkAndAwardStickers(nextStats);
          nextRound();
        }, 1400);
      } else {
        speak('Nice. Keep building the pattern.', 'effect');
      }
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setShakeId(slot.id);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('pattern-builder', false);
    speak(phrase, 'effect');
    await vibrate();

    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setShakeId(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 850);
  }, [checkAndAwardStickers, clearRoundTimer, getProjectedStats, nextRound, recordAttempt, selectedItemId, slots, speak, vibrate]);

  return {
    themeName,
    title,
    hint,
    ruleItems,
    groupSize,
    slots,
    trayItems,
    selectedItemId,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleTrayPress,
    handleSlotPress,
    speak
  };
}
