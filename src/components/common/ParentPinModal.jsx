import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { PinPad } from './PinPad';
import { palette } from '../../theme/palette';

export function ParentPinModal({
  visible,
  mode = 'verify',
  title,
  description,
  confirmLabel,
  onClose,
  onConfirm,
  verifyPin
}) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState('enter');
  const [error, setError] = useState('');

  useEffect(() => {
    setPin('');
    setConfirmPin('');
    setStep('enter');
    setError('');
  }, [mode, visible]);

  const handleVerify = () => {
    if (!verifyPin?.(pin)) {
      setError('That PIN does not match.');
      setPin('');
      return;
    }

    onConfirm(pin);
  };

  const handleCreate = () => {
    if (step === 'enter') {
      setStep('confirm');
      setConfirmPin('');
      setError('');
      return;
    }

    if (pin !== confirmPin) {
      setError('PINs do not match. Try again.');
      setConfirmPin('');
      return;
    }

    onConfirm(pin);
  };

  const currentValue = step === 'enter' ? pin : confirmPin;
  const currentChange = step === 'enter' ? setPin : setConfirmPin;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{description}</Text>
          {mode === 'create' && step === 'confirm' ? <Text style={styles.stepLabel}>Re-enter the same 4-digit PIN</Text> : null}

          <PinPad
            value={currentValue}
            onChange={(value) => {
              setError('');
              currentChange(value);
            }}
            onSubmit={mode === 'create' ? handleCreate : handleVerify}
            submitLabel={mode === 'create' ? (step === 'enter' ? 'Next' : confirmLabel || 'Save PIN') : confirmLabel || 'Unlock'}
            errorMessage={error}
          />

          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(44, 62, 80, 0.32)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  body: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: palette.textSecondary
  },
  stepLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: palette.textSecondary,
    marginBottom: 8
  },
  cancelButton: {
    marginTop: 18,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.textSecondary
  }
});
