import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../contexts/SettingsContext';

export function useVibration() {
  const { vibrationEnabled } = useSettings();

  return useCallback(async () => {
    if (!vibrationEnabled) {
      return;
    }

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch {
      // Ignore unsupported haptics devices.
    }
  }, [vibrationEnabled]);
}
