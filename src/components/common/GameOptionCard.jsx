import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../../theme/palette';

export function GameOptionCard({
  item,
  onPress,
  highlighted = false,
  showEmoji = true,
  showLabel = true,
  textFirst = false,
  emojiSize = 54,
  compact = false,
  extraCompact = false,
  style
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        compact && styles.cardCompact,
        extraCompact && styles.cardExtraCompact,
        highlighted && styles.highlighted,
        pressed && styles.pressed,
        style
      ]}
    >
      <LinearGradient colors={['#FFFFFF', '#F9FDFF']} style={[styles.fill, compact && styles.fillCompact, extraCompact && styles.fillExtraCompact]}>
        <View style={[styles.inner, textFirst && styles.innerTextFirst, compact && styles.innerCompact, extraCompact && styles.innerExtraCompact]}>
          {showLabel && textFirst ? (
            <Text style={[styles.label, styles.labelPrimary, compact && styles.labelCompact, extraCompact && styles.labelExtraCompact]}>
              {item.name}
            </Text>
          ) : null}
          {showEmoji ? (
            <Text
              style={[
                styles.emoji,
                { fontSize: emojiSize },
                compact && styles.emojiCompact,
                extraCompact && styles.emojiExtraCompact,
                textFirst && styles.emojiSecondary
              ]}
            >
              {item.emoji}
            </Text>
          ) : null}
          {showLabel && !textFirst ? (
            <Text style={[styles.label, compact && styles.labelCompact, extraCompact && styles.labelExtraCompact]}>{item.name}</Text>
          ) : null}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    borderRadius: 30,
    minHeight: 124,
    overflow: 'hidden',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  cardCompact: {
    minHeight: 104,
    borderRadius: 26
  },
  cardExtraCompact: {
    minWidth: '31%',
    minHeight: 84,
    borderRadius: 22
  },
  fill: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
    borderRadius: 30
  },
  fillCompact: {
    padding: 10,
    borderRadius: 26
  },
  fillExtraCompact: {
    padding: 8,
    borderRadius: 22
  },
  highlighted: {
    borderWidth: 4,
    borderColor: palette.error
  },
  pressed: {
    transform: [{ scale: 0.97 }]
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  innerCompact: {
    gap: 8
  },
  innerExtraCompact: {
    gap: 6
  },
  innerTextFirst: {
    gap: 8
  },
  emoji: {
    fontSize: 54
  },
  emojiSecondary: {
    opacity: 0.85
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: palette.textPrimary,
    lineHeight: 24
  },
  labelCompact: {
    fontSize: 15,
    lineHeight: 18
  },
  labelExtraCompact: {
    fontSize: 13,
    lineHeight: 16
  },
  labelPrimary: {
    fontSize: 20,
    lineHeight: 24
  },
  emojiCompact: {
    lineHeight: 44
  },
  emojiExtraCompact: {
    lineHeight: 34
  }
});
