import React from 'react';
import { SettingsProvider } from './SettingsContext';
import { GameProgressProvider } from './GameProgressContext';
import { StickerProvider } from './StickerContext';

export function AppProviders({ children }) {
  return (
    <SettingsProvider>
      <GameProgressProvider>
        <StickerProvider>{children}</StickerProvider>
      </GameProgressProvider>
    </SettingsProvider>
  );
}
