import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const traceTemplates = [
  {
    id: 'L',
    letter: 'L',
    points: [
      { x: 0.3, y: 0.12 },
      { x: 0.3, y: 0.82 },
      { x: 0.74, y: 0.82 }
    ]
  },
  {
    id: 'C',
    letter: 'C',
    points: [
      { x: 0.72, y: 0.18 },
      { x: 0.44, y: 0.12 },
      { x: 0.24, y: 0.34 },
      { x: 0.24, y: 0.66 },
      { x: 0.44, y: 0.86 },
      { x: 0.72, y: 0.8 }
    ]
  },
  {
    id: 'O',
    letter: 'O',
    points: [
      { x: 0.5, y: 0.12 },
      { x: 0.72, y: 0.24 },
      { x: 0.78, y: 0.5 },
      { x: 0.72, y: 0.76 },
      { x: 0.5, y: 0.88 },
      { x: 0.28, y: 0.76 },
      { x: 0.22, y: 0.5 },
      { x: 0.28, y: 0.24 },
      { x: 0.5, y: 0.12 }
    ]
  },
  {
    id: 'T',
    letter: 'T',
    points: [
      { x: 0.2, y: 0.16 },
      { x: 0.8, y: 0.16 },
      { x: 0.5, y: 0.16 },
      { x: 0.5, y: 0.84 }
    ]
  }
];

function distance(point, x, y) {
  const dx = point.x - x;
  const dy = point.y - y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function useLetterTrace() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [template, setTemplate] = useState(traceTemplates[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const tracingRef = useRef(false);
  const timeoutRef = useRef(null);
  const activeIndexRef = useRef(0);
  const lastMissAtRef = useRef(0);
  const difficulty = getDifficulty('letter-trace');

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    const pool = traceTemplates.slice(0, Math.min(traceTemplates.length, difficulty + 1));
    const nextTemplate = pool[Math.floor(Math.random() * pool.length)];

    tracingRef.current = false;
    lastMissAtRef.current = 0;
    setTemplate(nextTemplate);
    setActiveIndex(0);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`Trace the letter ${nextTemplate.letter}. Start at the green dot.`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const finishRound = useCallback(() => {
    const phrase = getRandomPhrase(correctPhrases);
    const nextStats = getProjectedStats('letter-trace', true);

    tracingRef.current = false;
    setScore((prev) => prev + 1);
    setShowConfetti(true);
    setFeedback({ show: true, type: 'success', message: phrase });
    recordAttempt('letter-trace', true);
    speak(phrase, 'effect');

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      checkAndAwardStickers(nextStats);
      nextRound();
    }, 1400);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, speak]);

  const registerMiss = useCallback(async () => {
    const now = Date.now();
    if (now - lastMissAtRef.current < 900) {
      return;
    }

    lastMissAtRef.current = now;
    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('letter-trace', false);
    speak('Start on the green dot.', 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [clearTimer, recordAttempt, speak, vibrate]);

  const handleTraceStart = useCallback((x, y, renderedPoints, threshold) => {
    const currentPoint = renderedPoints[activeIndexRef.current];

    if (!currentPoint) {
      return;
    }

    if (distance(currentPoint, x, y) <= threshold) {
      tracingRef.current = true;
      setFeedback({ show: false, type: '', message: '' });
      return;
    }

    registerMiss();
  }, [registerMiss]);

  const handleTraceMove = useCallback((x, y, renderedPoints, threshold) => {
    if (!tracingRef.current) {
      return;
    }

    const nextIndex = activeIndexRef.current + 1;
    const nextPoint = renderedPoints[nextIndex];

    if (!nextPoint) {
      return;
    }

    if (distance(nextPoint, x, y) <= threshold) {
      setActiveIndex(nextIndex);

      if (nextIndex === renderedPoints.length - 1) {
        finishRound();
      }
    }
  }, [finishRound]);

  const handleTraceEnd = useCallback(() => {
    tracingRef.current = false;
  }, []);

  return {
    template,
    activeIndex,
    score,
    feedback,
    showConfetti,
    handleTraceStart,
    handleTraceMove,
    handleTraceEnd,
    speak
  };
}
