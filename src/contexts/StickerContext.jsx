import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { stickerMilestones } from '../utils/constants';
import { getStoredJson, setStoredJson } from '../utils/storage';

const STORAGE_KEY = 'mobile-earned-stickers';

const StickerContext = createContext(null);

export function StickerProvider({ children }) {
  const [earnedStickers, setEarnedStickers] = useState([]);
  const [newSticker, setNewSticker] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getStoredJson(STORAGE_KEY, []).then((value) => {
      setEarnedStickers(value || []);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      setStoredJson(STORAGE_KEY, earnedStickers);
    }
  }, [earnedStickers, isReady]);

  const checkAndAwardStickers = useCallback((stats) => {
    const earnedIds = earnedStickers.map((item) => item.id);
    for (const milestone of stickerMilestones) {
      if (!earnedIds.includes(milestone.id) && milestone.check(stats)) {
        const sticker = { id: milestone.id, earnedAt: new Date().toISOString() };
        setEarnedStickers((prev) => [...prev, sticker]);
        setNewSticker(milestone);
        break;
      }
    }
  }, [earnedStickers]);

  const dismissNewSticker = useCallback(() => {
    setNewSticker(null);
  }, []);

  return (
    <StickerContext.Provider value={{ earnedStickers, newSticker, checkAndAwardStickers, dismissNewSticker }}>
      {children}
    </StickerContext.Provider>
  );
}

export function useStickers() {
  return useContext(StickerContext);
}
