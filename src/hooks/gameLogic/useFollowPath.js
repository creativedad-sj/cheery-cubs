import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, pathThemes, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const trailLayouts = {
  1: [
    {
      rows: 4,
      cols: 4,
      path: [[3, 0], [2, 0], [2, 1], [1, 1], [1, 2], [0, 2], [0, 3]],
      branches: [[3, 1], [2, 2]]
    },
    {
      rows: 4,
      cols: 4,
      path: [[3, 0], [3, 1], [2, 1], [1, 1], [1, 2], [1, 3], [0, 3]],
      branches: [[2, 0], [2, 2]]
    }
  ],
  2: [
    {
      rows: 4,
      cols: 5,
      path: [[3, 0], [2, 0], [2, 1], [2, 2], [1, 2], [1, 3], [0, 3], [0, 4]],
      branches: [[3, 1], [1, 1], [2, 3]]
    },
    {
      rows: 4,
      cols: 5,
      path: [[3, 0], [3, 1], [2, 1], [1, 1], [1, 2], [1, 3], [2, 3], [2, 4]],
      branches: [[2, 0], [0, 2], [3, 3]]
    }
  ],
  3: [
    {
      rows: 5,
      cols: 5,
      path: [[4, 0], [3, 0], [3, 1], [2, 1], [1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [3, 4], [4, 4]],
      branches: [[4, 1], [2, 0], [2, 2], [2, 4], [4, 3]]
    },
    {
      rows: 5,
      cols: 5,
      path: [[4, 0], [4, 1], [3, 1], [2, 1], [2, 2], [2, 3], [1, 3], [0, 3], [0, 4], [1, 4], [2, 4]],
      branches: [[3, 0], [3, 2], [1, 2], [0, 2], [3, 4]]
    }
  ]
};

function keyFor(row, col) {
  return `${row}-${col}`;
}

function keysFor(cells) {
  return cells.map(([row, col]) => keyFor(row, col));
}

export function useFollowPath() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [theme, setTheme] = useState(pathThemes[0]);
  const [board, setBoard] = useState({ rows: 4, cols: 4 });
  const [pathKeys, setPathKeys] = useState([]);
  const [walkableKeys, setWalkableKeys] = useState([]);
  const [visitedKeys, setVisitedKeys] = useState([]);
  const [currentKey, setCurrentKey] = useState('');
  const [startKey, setStartKey] = useState('');
  const [goalKey, setGoalKey] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [wrongKey, setWrongKey] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const speakRef = useRef(speak);
  const pathRef = useRef([]);
  const visitedRef = useRef([]);
  const currentKeyRef = useRef('');
  const goalKeyRef = useRef('');
  const startKeyRef = useRef('');
  const tracingRef = useRef(false);
  const lastMissAtRef = useRef(0);
  const previousRoundRef = useRef({ themeId: '', layoutIndex: -1 });

  const difficulty = getDifficulty('follow-path');

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  useEffect(() => {
    pathRef.current = pathKeys;
  }, [pathKeys]);

  useEffect(() => {
    visitedRef.current = visitedKeys;
  }, [visitedKeys]);

  useEffect(() => {
    currentKeyRef.current = currentKey;
  }, [currentKey]);

  useEffect(() => {
    goalKeyRef.current = goalKey;
  }, [goalKey]);

  useEffect(() => {
    startKeyRef.current = startKey;
  }, [startKey]);

  const clearRoundTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearRoundTimer, [clearRoundTimer]);

  const nextRound = useCallback(() => {
    clearRoundTimer();

    const layoutPool = trailLayouts[difficulty] || trailLayouts[1];
    const lastRound = previousRoundRef.current;
    const layoutOptions = layoutPool.map((layout, index) => ({ layout, index }));
    const eligibleLayouts =
      layoutOptions.length > 1
        ? layoutOptions.filter((entry) => entry.index !== lastRound.layoutIndex)
        : layoutOptions;
    const chosenLayoutEntry = eligibleLayouts[Math.floor(Math.random() * eligibleLayouts.length)];
    const themeOptions =
      pathThemes.length > 1
        ? pathThemes.filter((entry) => entry.id !== lastRound.themeId)
        : pathThemes;
    const pickedTheme = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    const pickedLayout = chosenLayoutEntry.layout;
    const nextPathKeys = keysFor(pickedLayout.path);
    const nextBranchKeys = keysFor(pickedLayout.branches || []);
    const nextStart = nextPathKeys[0];
    const nextGoal = nextPathKeys[nextPathKeys.length - 1];

    previousRoundRef.current = {
      themeId: pickedTheme.id,
      layoutIndex: chosenLayoutEntry.index
    };
    tracingRef.current = false;
    lastMissAtRef.current = 0;
    setTheme(pickedTheme);
    setBoard({ rows: pickedLayout.rows, cols: pickedLayout.cols });
    setPathKeys(nextPathKeys);
    setWalkableKeys([...nextPathKeys, ...nextBranchKeys]);
    setVisitedKeys([nextStart]);
    setCurrentKey(nextStart);
    setStartKey(nextStart);
    setGoalKey(nextGoal);
    setFeedback({ show: false, type: '', message: '' });
    setWrongKey(null);
    setShowConfetti(false);

    speakRef.current(`Trace the trail from ${pickedTheme.traveler} to ${pickedTheme.goal}.`, 'question');
  }, [clearRoundTimer, difficulty]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const registerMiss = useCallback((cellKey) => {
    const now = Date.now();
    if (now - lastMissAtRef.current < 650) {
      return;
    }

    lastMissAtRef.current = now;
    const phrase = getRandomPhrase(wrongPhrases);
    setWrongKey(cellKey);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('follow-path', false);
    speak(phrase, 'effect');
    vibrate();

    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setWrongKey(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 850);
  }, [clearRoundTimer, recordAttempt, speak, vibrate]);

  const finishRound = useCallback(() => {
    const phrase = getRandomPhrase(correctPhrases);
    const nextStats = getProjectedStats('follow-path', true);

    tracingRef.current = false;
    setScore((prev) => prev + 1);
    setShowConfetti(true);
    setFeedback({ show: true, type: 'success', message: phrase });
    recordAttempt('follow-path', true);
    speak(phrase, 'effect');

    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      checkAndAwardStickers(nextStats);
      nextRound();
    }, 1400);
  }, [checkAndAwardStickers, clearRoundTimer, getProjectedStats, nextRound, recordAttempt, speak]);

  const advanceTrace = useCallback((cellKey) => {
    if (!cellKey) {
      return;
    }

    const currentPath = pathRef.current;
    const currentVisited = visitedRef.current;
    const current = currentKeyRef.current;
    const currentIndex = currentPath.indexOf(current);
    const nextKey = currentPath[currentIndex + 1];
    const previousKey = currentVisited[currentVisited.length - 2];

    if (cellKey === current) {
      return;
    }

    if (cellKey === previousKey) {
      const trimmed = currentVisited.slice(0, currentVisited.length - 1);
      setVisitedKeys(trimmed);
      setCurrentKey(cellKey);
      return;
    }

    if (cellKey === nextKey) {
      const nextVisited = [...currentVisited, cellKey];
      setVisitedKeys(nextVisited);
      setCurrentKey(cellKey);

      if (cellKey === goalKeyRef.current) {
        finishRound();
      }
      return;
    }

    registerMiss(cellKey);
  }, [finishRound, registerMiss]);

  const handleTraceStart = useCallback((cellKey) => {
    if (!cellKey) {
      return;
    }

    const start = startKeyRef.current;
    const current = currentKeyRef.current;

    if (cellKey === current) {
      tracingRef.current = true;
      return;
    }

    if (cellKey === start) {
      tracingRef.current = true;
      setVisitedKeys([start]);
      setCurrentKey(start);
      setFeedback({ show: false, type: '', message: '' });
      setWrongKey(null);
      return;
    }

    registerMiss(cellKey);
  }, [registerMiss]);

  const handleTraceMove = useCallback((cellKey) => {
    if (!tracingRef.current || !cellKey) {
      return;
    }

    advanceTrace(cellKey);
  }, [advanceTrace]);

  const handleTraceEnd = useCallback(() => {
    tracingRef.current = false;
  }, []);

  return {
    theme,
    board,
    pathKeys,
    walkableKeys,
    visitedKeys,
    currentKey,
    startKey,
    goalKey,
    score,
    feedback,
    wrongKey,
    showConfetti,
    handleTraceStart,
    handleTraceMove,
    handleTraceEnd,
    speak
  };
}
