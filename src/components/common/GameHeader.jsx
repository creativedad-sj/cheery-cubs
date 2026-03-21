import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../theme/palette';

export function GameHeader({ title, score, onBack, onSettings }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} style={styles.chip}>
        <Text style={styles.chipText}>← Home</Text>
      </Pressable>

      <View style={styles.center}>
        <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.75} style={styles.title}>{title}</Text>
      </View>

      <View style={styles.actions}>
        {typeof score === 'number' ? (
          <View style={styles.score}>
            <Text style={styles.scoreText}>⭐ {score}</Text>
          </View>
        ) : null}
        <Pressable onPress={onSettings} style={styles.iconButton}>
          <Text style={styles.iconText}>⚙️</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 18
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 88,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  chipText: {
    fontSize: 15,
    fontWeight: '800',
    color: palette.textSecondary
  },
  center: {
    flex: 1,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  score: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 66,
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  scoreText: {
    fontSize: 15,
    fontWeight: '800',
    color: palette.primary
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  iconText: {
    fontSize: 21
  }
});
