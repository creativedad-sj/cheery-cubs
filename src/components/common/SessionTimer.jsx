import { useEffect, useRef, useState } from 'react';
import { AppState, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ParentPinModal } from './ParentPinModal';
import { useSettings } from '../../contexts/SettingsContext';
import { palette } from '../../theme/palette';

export function SessionTimer() {
  const { sessionMinutes, isReady, parentPin, setParentPin, setSessionMinutes, verifyParentPin } = useSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [isParentUnlocked, setIsParentUnlocked] = useState(false);
  const intervalRef = useRef(null);
  const startedAtRef = useRef(null);
  const elapsedMsRef = useRef(0);
  const timedOutRef = useRef(false);

  useEffect(() => {
    const clearTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const limitMs = sessionMinutes * 60 * 1000;

    const checkTimeout = () => {
      if (!startedAtRef.current || !limitMs || timedOutRef.current) {
        return;
      }

      const totalElapsed = elapsedMsRef.current + (Date.now() - startedAtRef.current);
      if (totalElapsed >= limitMs) {
        timedOutRef.current = true;
        clearTimer();
        setIsVisible(true);
      }
    };

    const startTracking = () => {
      if (!isReady || !sessionMinutes || timedOutRef.current) {
        return;
      }

      startedAtRef.current = Date.now();
      clearTimer();
      intervalRef.current = setInterval(checkTimeout, 1000);
    };

    const stopTracking = () => {
      if (startedAtRef.current) {
        elapsedMsRef.current += Date.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
      clearTimer();
    };

    if (!isReady) {
      return undefined;
    }

    elapsedMsRef.current = 0;
    startedAtRef.current = null;
    timedOutRef.current = false;
    setIsVisible(false);
    setShowUnlock(false);
    setIsParentUnlocked(false);

    if (sessionMinutes) {
      startTracking();
    } else {
      clearTimer();
    }

    const subscription = AppState.addEventListener('change', (state) => {
      if (!sessionMinutes || timedOutRef.current) {
        return;
      }

      if (state === 'active') {
        startTracking();
      } else {
        stopTracking();
      }
    });

    return () => {
      stopTracking();
      subscription.remove();
    };
  }, [isReady, sessionMinutes]);

  useEffect(() => {
    if (!isVisible) {
      setShowUnlock(false);
      setIsParentUnlocked(false);
    }
  }, [isVisible]);

  const addMoreTime = (minutes) => {
    timedOutRef.current = false;
    elapsedMsRef.current = 0;
    startedAtRef.current = null;
    setSessionMinutes(minutes);
    setIsVisible(false);
    setShowUnlock(false);
    setIsParentUnlocked(false);
  };

  return (
    <>
      <Modal visible={isVisible} transparent animationType="fade" onRequestClose={() => {}}>
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Text style={styles.emoji}>⏰</Text>
            <Text style={styles.title}>Time for a break</Text>
            <Text style={styles.body}>Your screen-time limit is up. Great job playing and learning today.</Text>

            {isParentUnlocked ? (
              <View style={styles.extendSection}>
                <Text style={styles.extendTitle}>Add more playtime</Text>
                <View style={styles.extendActions}>
                  {[5, 10, 15].map((minutes) => (
                    <Pressable key={minutes} onPress={() => addMoreTime(minutes)} style={styles.extendButton}>
                      <Text style={styles.extendText}>{minutes} more min</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.actions}>
                <Pressable onPress={() => setShowUnlock(true)} style={styles.button}>
                  <Text style={styles.buttonText}>Parent area</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <ParentPinModal
        visible={showUnlock}
        mode={parentPin ? 'verify' : 'create'}
        title={parentPin ? 'Parent PIN required' : 'Create parent PIN'}
        description={
          parentPin
            ? 'Enter the parent PIN to add more playtime.'
            : 'Create a 4-digit PIN before allowing more playtime.'
        }
        confirmLabel={parentPin ? 'Unlock' : 'Save PIN'}
        onClose={() => setShowUnlock(false)}
        onConfirm={(pinValue) => {
          if (!parentPin) {
            setParentPin(pinValue);
          }
          setShowUnlock(false);
          setIsParentUnlocked(true);
        }}
        verifyPin={verifyParentPin}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(44, 62, 80, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  body: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 23,
    color: palette.textSecondary,
    textAlign: 'center'
  },
  button: {
    backgroundColor: palette.primary,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  },
  actions: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10
  },
  extendSection: {
    marginTop: 18,
    width: '100%'
  },
  extendTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center',
    marginBottom: 12
  },
  extendActions: {
    gap: 10
  },
  extendButton: {
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center'
  },
  extendText: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: '800'
  }
});
