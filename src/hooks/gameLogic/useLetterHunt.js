import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const letterFamilies = [
  {
    id: 'b',
    clue: 'B',
    variants: ['B', 'b'],
    distractors: ['R', 'P', 'D', '6', '8']
  },
  {
    id: 'm',
    clue: 'M',
    variants: ['M', 'm'],
    distractors: ['N', 'W', 'H', 'n', 'w']
  },
  {
    id: 'o',
    clue: 'O',
    variants: ['O', 'o'],
    distractors: ['Q', 'C', '0', 'G', 'U']
  },
  {
    id: 't',
    clue: 'T',
    variants: ['T', 't'],
    distractors: ['I', 'L', 'F', 'Y', 'l']
  },
  {
    id: 's',
    clue: 'S',
    variants: ['S', 's'],
    distractors: ['5', 'C', 'Z', 'G', '2']
  }
];

const roundConfig = {
  1: { totalOptions: 6, targetCount: 2, mixCase: false },
  2: { totalOptions: 8, targetCount: 3, mixCase: true },
  3: { totalOptions: 9, targetCount: 4, mixCase: true }
};

function buildTargetOptions(family, targetCount, mixCase) {
  return Array.from({ length: targetCount }, (_, index) => {
    const variant = mixCase ? family.variants[index % family.variants.length] : family.variants[0];
    return {
      id: `target-${index}`,
      letter: variant,
      isTarget: true,
      collected: false
    };
  });
}

function buildDistractors(family, count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `wrong-${index}`,
    letter: family.distractors[index % family.distractors.length],
    isTarget: false,
    collected: false
  }));
}

export function useLetterHunt() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [targetLetter, setTargetLetter] = useState('B');
  const [targetVariants, setTargetVariants] = useState(['B']);
  const [mixCase, setMixCase] = useState(false);
  const [targetCount, setTargetCount] = useState(2);
  const [collectedCount, setCollectedCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('letter-hunt');
  const speakRef = useRef(speak);
  const targetCountRef = useRef(0);

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  useEffect(() => {
    targetCountRef.current = targetCount;
  }, [targetCount]);

  const clearRoundTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearRoundTimer, [clearRoundTimer]);

  const nextRound = useCallback(() => {
    clearRoundTimer();

    const config = roundConfig[difficulty] || roundConfig[1];
    const family = letterFamilies[Math.floor(Math.random() * letterFamilies.length)];
    const targets = buildTargetOptions(family, config.targetCount, config.mixCase);
    const distractors = buildDistractors(family, config.totalOptions - config.targetCount);

    setTargetLetter(family.clue);
    setTargetVariants(config.mixCase ? family.variants : [family.variants[0]]);
    setMixCase(config.mixCase);
    setTargetCount(config.targetCount);
    setCollectedCount(0);
    setOptions(shuffle([...targets, ...distractors]));
    setFeedback({ show: false, type: '', message: '' });
    setShakeId(null);
    setShowConfetti(false);

    const clueText = config.mixCase
      ? `Find all the ${family.clue} letters. Big and little ${family.clue}.`
      : `Find all the ${family.clue} letters.`;
    speakRef.current(clueText, 'question');
  }, [clearRoundTimer, difficulty]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (item) => {
    if (item.collected) {
      return;
    }

    if (item.isTarget) {
      const nextCollected = collectedCount + 1;
      setCollectedCount(nextCollected);
      setOptions((prev) => prev.map((entry) => (entry.id === item.id ? { ...entry, collected: true } : entry)));

      if (nextCollected === targetCountRef.current) {
        const phrase = getRandomPhrase(correctPhrases);
        const nextStats = getProjectedStats('letter-hunt', true);

        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: phrase });
        recordAttempt('letter-hunt', true);
        speak(phrase, 'effect');

        clearRoundTimer();
        timeoutRef.current = setTimeout(() => {
          checkAndAwardStickers(nextStats);
          nextRound();
        }, 1400);
      } else {
        speak(`Nice. ${targetCountRef.current - nextCollected} more.`, 'effect');
      }
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setShakeId(item.id);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('letter-hunt', false);
    speak(phrase, 'effect');
    await vibrate();

    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setShakeId(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 850);
  }, [checkAndAwardStickers, clearRoundTimer, collectedCount, getProjectedStats, nextRound, recordAttempt, speak, vibrate]);

  return {
    targetLetter,
    targetVariants,
    mixCase,
    targetCount,
    collectedCount,
    options,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleOptionPress,
    speak
  };
}
