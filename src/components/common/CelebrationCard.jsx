import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../../theme/palette';

export function CelebrationCard({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.text}>Awesome work!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: palette.accent,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  emoji: {
    fontSize: 24
  },
  text: {
    fontSize: 17,
    fontWeight: '800',
    color: palette.textPrimary
  }
});
