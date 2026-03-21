import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../theme/palette';

export function PinPad({ value, onChange, onSubmit, submitLabel = 'Continue', errorMessage }) {
  const addDigit = (digit) => {
    if (value.length >= 4) {
      return;
    }

    onChange(`${value}${digit}`);
  };

  const removeDigit = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <View>
      <View style={styles.dotsRow}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={[styles.dot, value[index] && styles.dotFilled]} />
        ))}
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <Pressable key={digit} onPress={() => addDigit(String(digit))} style={({ pressed }) => [styles.key, pressed && styles.pressed]}>
            <Text style={styles.keyText}>{digit}</Text>
          </Pressable>
        ))}
        <Pressable onPress={removeDigit} style={({ pressed }) => [styles.key, styles.secondaryKey, pressed && styles.pressed]}>
          <Text style={styles.secondaryKeyText}>⌫</Text>
        </Pressable>
        <Pressable onPress={() => addDigit('0')} style={({ pressed }) => [styles.key, pressed && styles.pressed]}>
          <Text style={styles.keyText}>0</Text>
        </Pressable>
        <Pressable
          onPress={onSubmit}
          disabled={value.length !== 4}
          style={({ pressed }) => [styles.key, styles.submitKey, value.length !== 4 && styles.submitDisabled, pressed && value.length === 4 && styles.pressed]}
        >
          <Text style={styles.submitText}>{submitLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 14
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E2E8F0'
  },
  dotFilled: {
    backgroundColor: palette.primary
  },
  errorText: {
    textAlign: 'center',
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12
  },
  key: {
    width: 74,
    height: 74,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  secondaryKey: {
    backgroundColor: '#FFF7ED'
  },
  submitKey: {
    backgroundColor: palette.primary
  },
  submitDisabled: {
    backgroundColor: '#FCA5A5'
  },
  keyText: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.textPrimary
  },
  secondaryKeyText: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.textPrimary
  },
  submitText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  pressed: {
    transform: [{ scale: 0.96 }]
  }
});
