import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { animals, correctPhrases, getRandomPhrase, instruments, shuffle, sportsEquipment, vehicles } from '../../utils/constants';
import { useSpeech } from '../useSpeech';

const memoryPool = [...animals.slice(0, 8), ...vehicles.slice(0, 6), ...sportsEquipment.slice(0, 6), ...instruments.slice(0, 6)];

export function useMemory() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [previewPhase, setPreviewPhase] = useState(true);
  const lockRef = useRef(false);
  const resetTimerRef = useRef(null);

  const difficulty = getDifficulty('memory-game');
  const pairCount = useMemo(() => (difficulty === 1 ? 3 : difficulty === 2 ? 6 : 8), [difficulty]);

  const speakRef = useRef(speak);
  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  const clearTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const initGame = useCallback(() => {
    clearTimer();
    const selected = shuffle(memoryPool).slice(0, pairCount);
    const pairs = selected.flatMap((item) => [
      { id: `${item.id}-a`, pairId: item.id, emoji: item.emoji, name: item.name, faceUp: true, matched: false },
      { id: `${item.id}-b`, pairId: item.id, emoji: item.emoji, name: item.name, faceUp: true, matched: false }
    ]);

    setCards(shuffle(pairs));
    setFlipped([]);
    setMoves(0);
    setMatchedPairs(0);
    setTotalPairs(pairCount);
    setShowConfetti(false);
    setPreviewPhase(true);
    setFeedback({ show: false, type: '', message: '' });
    lockRef.current = false;
    speakRef.current('Look at the cards, then find the matching pairs', 'question');
    resetTimerRef.current = setTimeout(() => {
      setCards((prev) => prev.map((card) => ({ ...card, faceUp: false })));
      setPreviewPhase(false);
    }, pairCount <= 3 ? 1800 : 2400);
  }, [pairCount]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = useCallback((index) => {
    if (lockRef.current) {
      return;
    }
    if (previewPhase) {
      return;
    }

    const card = cards[index];
    if (!card || card.faceUp || card.matched) {
      return;
    }

    const nextCards = [...cards];
    nextCards[index] = { ...nextCards[index], faceUp: true };
    const nextFlipped = [...flipped, index];
    setCards(nextCards);
    setFlipped(nextFlipped);

    if (nextFlipped.length !== 2) {
      return;
    }

    lockRef.current = true;
    setMoves((value) => value + 1);
    const [first, second] = nextFlipped;
    const firstCard = nextCards[first];
    const secondCard = nextCards[second];

    if (firstCard.pairId === secondCard.pairId) {
      const updated = [...nextCards];
      updated[first] = { ...updated[first], matched: true };
      updated[second] = { ...updated[second], matched: true };
      const nextMatched = matchedPairs + 1;

      setCards(updated);
      setFlipped([]);
      setMatchedPairs(nextMatched);

      const phrase = getRandomPhrase(correctPhrases);
      setFeedback({ show: true, type: 'success', message: phrase });
      speakRef.current(phrase, 'effect');
      clearTimer();
      resetTimerRef.current = setTimeout(() => {
        setFeedback({ show: false, type: '', message: '' });
      }, 900);

      if (nextMatched === totalPairs) {
        const nextStats = getProjectedStats('memory-game', true);
        recordAttempt('memory-game', true);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: 'You found them all!' });
        speakRef.current('You found them all', 'effect');
        checkAndAwardStickers(nextStats);
        clearTimer();
        resetTimerRef.current = setTimeout(() => {
          setShowConfetti(false);
          initGame();
        }, 2200);
      }

      lockRef.current = false;
      return;
    }

    clearTimer();
    resetTimerRef.current = setTimeout(() => {
      const updated = [...nextCards];
      updated[first] = { ...updated[first], faceUp: false };
      updated[second] = { ...updated[second], faceUp: false };
      setCards(updated);
      setFlipped([]);
      lockRef.current = false;
    }, 900);
  }, [cards, checkAndAwardStickers, flipped, getProjectedStats, initGame, matchedPairs, previewPhase, recordAttempt, totalPairs]);

  return {
    cards,
    moves,
    matchedPairs,
    totalPairs,
    showConfetti,
    feedback,
    handleCardClick,
    difficulty,
    previewPhase
  };
}
