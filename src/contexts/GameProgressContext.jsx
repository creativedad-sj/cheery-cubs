import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getStoredJson, setStoredJson } from '../utils/storage';

const STORAGE_KEY = 'mobile-game-progress';

const defaultGameStats = {
  attempts: 0,
  correct: 0,
  lastPlayed: null,
  history: [],
  streak: 0,
  difficulty: 1,
  lastLevelUpStreak: 0
};

function buildNextStats(prev, gameId, isCorrect) {
  const gameStats = { ...defaultGameStats, ...prev[gameId] };
  const newStreak = isCorrect ? gameStats.streak + 1 : 0;
  let newDifficulty = gameStats.difficulty || 1;
  let newLastLevelUpStreak = gameStats.lastLevelUpStreak || 0;

  if (isCorrect) {
    if (newStreak >= 5 && newDifficulty < 3) {
      const streakSinceLevelUp = newStreak - newLastLevelUpStreak;
      if (streakSinceLevelUp >= 5) {
        newDifficulty = Math.min(3, newDifficulty + 1);
        newLastLevelUpStreak = newStreak;
      }
    }
  } else {
    newLastLevelUpStreak = 0;
    const history = gameStats.history || [];
    if (gameStats.streak === 0 && newDifficulty > 1) {
      const recent = [{ correct: 0 }, ...history.slice(0, 4)];
      const recentCorrect = recent.reduce((sum, item) => sum + (item.correct || 0), 0);
      if (recent.length >= 5 && recentCorrect / recent.length < 0.4) {
        newDifficulty = Math.max(1, newDifficulty - 1);
      }
    }
  }

  const newStats = {
    ...gameStats,
    attempts: gameStats.attempts + 1,
    correct: gameStats.correct + (isCorrect ? 1 : 0),
    lastPlayed: new Date().toISOString(),
    streak: newStreak,
    difficulty: newDifficulty,
    lastLevelUpStreak: newLastLevelUpStreak,
    history: [
      { date: new Date().toISOString(), correct: isCorrect ? 1 : 0 },
      ...(gameStats.history || []).slice(0, 9)
    ]
  };

  return {
    ...prev,
    [gameId]: newStats
  };
}

const GameProgressContext = createContext(null);

export function GameProgressProvider({ children }) {
  const [stats, setStats] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getStoredJson(STORAGE_KEY, {}).then((value) => {
      setStats(value || {});
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      setStoredJson(STORAGE_KEY, stats);
    }
  }, [isReady, stats]);

  const recordAttempt = useCallback((gameId, isCorrect) => {
    setStats((prev) => buildNextStats(prev, gameId, isCorrect));
  }, []);

  const getProjectedStats = useCallback((gameId, isCorrect) => {
    return buildNextStats(stats, gameId, isCorrect);
  }, [stats]);

  const getDifficulty = useCallback((gameId) => stats[gameId]?.difficulty || 1, [stats]);

  const resetGameStats = useCallback((gameId) => {
    if (gameId) {
      setStats((prev) => ({ ...prev, [gameId]: { ...defaultGameStats } }));
      return;
    }

    setStats({});
  }, []);

  return (
    <GameProgressContext.Provider value={{ stats, isReady, recordAttempt, getProjectedStats, getDifficulty, resetGameStats }}>
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress() {
  return useContext(GameProgressContext);
}
