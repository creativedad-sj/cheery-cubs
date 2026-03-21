import { useCallback } from 'react';
import * as Speech from 'expo-speech';
import { useSettings } from '../contexts/SettingsContext';

export function useSpeech() {
  const { soundEnabled, spokenQuestionEnabled } = useSettings();

  return useCallback((text, type = 'question') => {
    if (!text) {
      return;
    }

    const isAllowed = type === 'effect' ? soundEnabled : spokenQuestionEnabled;

    if (!isAllowed) {
      return;
    }

    Speech.stop();
    Speech.speak(text, {
      pitch: 1.15,
      rate: 0.85
    });
  }, [soundEnabled, spokenQuestionEnabled]);
}
