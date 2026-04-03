import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const sequenceRounds = [
  {
    title: 'Plant story',
    steps: [
      { id: 'seed', label: 'Seed', emoji: '🌱' },
      { id: 'sprout', label: 'Sprout', emoji: '🌿' },
      { id: 'flower', label: 'Flower', emoji: '🌸' }
    ]
  },
  {
    title: 'Egg story',
    steps: [
      { id: 'egg', label: 'Egg', emoji: '🥚' },
      { id: 'chick', label: 'Chick', emoji: '🐥' },
      { id: 'chicken', label: 'Chicken', emoji: '🐔' }
    ]
  },
  {
    title: 'Rain story',
    steps: [
      { id: 'cloud', label: 'Cloud', emoji: '☁️' },
      { id: 'rain', label: 'Rain', emoji: '🌧️' },
      { id: 'rainbow', label: 'Rainbow', emoji: '🌈' }
    ]
  },
  {
    title: 'Night story',
    steps: [
      { id: 'sunset', label: 'Sunset', emoji: '🌇' },
      { id: 'moon', label: 'Moon', emoji: '🌙' },
      { id: 'sleep', label: 'Sleep', emoji: '😴' }
    ]
  }
];

export function useStorySequence() {
  const { recordAttempt, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(sequenceRounds[0]);
  const [options, setOptions] = useState(sequenceRounds[0].steps);
  const [placed, setPlaced] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    const next = sequenceRounds[Math.floor(Math.random() * sequenceRounds.length)];
    setRound(next);
    setOptions(shuffle([...next.steps]));
    setPlaced([]);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`Put the ${next.title.toLowerCase()} in order.`, 'question');
  }, [clearTimer, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (item) => {
    const nextIndex = placed.length;
    const expected = round.steps[nextIndex];

    if (item.id === expected.id) {
      const nextPlaced = [...placed, item];
      setPlaced(nextPlaced);
      setOptions((prev) => prev.filter((entry) => entry.id !== item.id));

      if (nextPlaced.length === round.steps.length) {
        const phrase = getRandomPhrase(correctPhrases);
        const nextStats = getProjectedStats('story-sequence', true);

        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: phrase });
        recordAttempt('story-sequence', true);
        speak(phrase, 'effect');

        clearTimer();
        timeoutRef.current = setTimeout(() => {
          checkAndAwardStickers(nextStats);
          nextRound();
        }, 1400);
      } else {
        speak('Nice. What comes next?', 'effect');
      }
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('story-sequence', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, placed, recordAttempt, round.steps, speak, vibrate]);

  return {
    round,
    options,
    placed,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}
