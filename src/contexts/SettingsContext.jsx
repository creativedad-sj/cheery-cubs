import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getStoredJson, setStoredJson } from '../utils/storage';

const STORAGE_KEY = 'mobile-settings';

const defaultState = {
  soundEnabled: true,
  vibrationEnabled: true,
  spokenQuestionEnabled: true,
  questionModes: ['image', 'sound', 'text'],
  sessionMinutes: 0,
  parentPin: '',
  childStageId: ''
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getStoredJson(STORAGE_KEY, defaultState).then((value) => {
      const normalized = { ...defaultState, ...value };

      if (typeof value?.spokenQuestionEnabled !== 'boolean' && typeof value?.voiceEnabled === 'boolean') {
        normalized.spokenQuestionEnabled = value.voiceEnabled;
      }

      if (!normalized.spokenQuestionEnabled) {
        normalized.questionModes = normalized.questionModes.filter((mode) => mode !== 'sound');
        if (normalized.questionModes.length === 0) {
          normalized.questionModes = ['image'];
        }
      }

      setSettings(normalized);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      setStoredJson(STORAGE_KEY, settings);
    }
  }, [isReady, settings]);

  const toggleSound = useCallback(() => {
    setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const toggleVibration = useCallback(() => {
    setSettings((prev) => ({ ...prev, vibrationEnabled: !prev.vibrationEnabled }));
  }, []);

  const toggleSpokenQuestion = useCallback(() => {
    setSettings((prev) => {
      if (prev.spokenQuestionEnabled) {
        const nextModes = prev.questionModes.filter((mode) => mode !== 'sound');

        return {
          ...prev,
          spokenQuestionEnabled: false,
          questionModes: nextModes.length > 0 ? nextModes : ['image']
        };
      }

      return {
        ...prev,
        spokenQuestionEnabled: true
      };
    });
  }, []);

  const toggleQuestionMode = useCallback((mode) => {
    setSettings((prev) => {
      if (mode === 'sound' && !prev.spokenQuestionEnabled) {
        return {
          ...prev,
          spokenQuestionEnabled: true,
          questionModes: prev.questionModes.includes('sound')
            ? prev.questionModes
            : [...prev.questionModes, 'sound']
        };
      }

      if (prev.questionModes.includes(mode)) {
        if (prev.questionModes.length <= 1) {
          return prev;
        }

        return {
          ...prev,
          questionModes: prev.questionModes.filter((item) => item !== mode)
        };
      }

      return {
        ...prev,
        questionModes: [...prev.questionModes, mode]
      };
    });
  }, []);

  const setSessionMinutes = useCallback((value) => {
    setSettings((prev) => ({ ...prev, sessionMinutes: value }));
  }, []);

  const setParentPin = useCallback((value) => {
    setSettings((prev) => ({ ...prev, parentPin: value }));
  }, []);

  const setChildStageId = useCallback((value) => {
    setSettings((prev) => ({ ...prev, childStageId: value }));
  }, []);

  const clearParentPin = useCallback(() => {
    setSettings((prev) => ({ ...prev, parentPin: '' }));
  }, []);

  const verifyParentPin = useCallback((value) => {
    return settings.parentPin.length > 0 && settings.parentPin === value;
  }, [settings.parentPin]);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        isReady,
        toggleSound,
        toggleVibration,
        toggleSpokenQuestion,
        toggleQuestionMode,
        setSessionMinutes,
        setParentPin,
        setChildStageId,
        clearParentPin,
        verifyParentPin,
        voiceEnabled: settings.spokenQuestionEnabled,
        spokenQuestionEnabled: settings.spokenQuestionEnabled,
        toggleVoice: toggleSpokenQuestion
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
