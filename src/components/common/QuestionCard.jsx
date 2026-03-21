import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../../theme/palette';

export function QuestionCard({
  text,
  onSpeak,
  showText = true,
  showSound = true,
  showImage = false,
  visual,
  soundOnlyLabel = 'Listen',
  modeHint
}) {
  const soundOnly = showSound && !showText && !showImage;
  const showTopRow = Boolean(modeHint) || (showSound && !soundOnly);

  return (
    <LinearGradient colors={['#FFFFFF', '#FFF8EC']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      {showTopRow ? (
        <View style={styles.topRow}>
          {modeHint ? (
            <View style={styles.promptPill}>
              <Text style={styles.promptPillText}>{modeHint}</Text>
            </View>
          ) : (
            <View />
          )}

          {showSound && !soundOnly ? (
            <Pressable onPress={onSpeak} style={styles.button}>
              <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.buttonFill}>
                <Text style={styles.buttonText}>🔊</Text>
              </LinearGradient>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <View style={styles.content}>
        {showImage && visual ? <View style={styles.visualWrap}>{visual}</View> : null}

        {showText ? <Text style={styles.text}>{text}</Text> : null}

        {soundOnly ? (
          <Pressable onPress={onSpeak} style={styles.listenButton}>
            <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.listenFill}>
              <Text style={styles.listenEmoji}>🔊</Text>
              <Text style={styles.listenText}>{soundOnlyLabel}</Text>
            </LinearGradient>
          </Pressable>
        ) : null}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 18,
    gap: 12,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12
  },
  promptPill: {
    backgroundColor: palette.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexShrink: 1,
    maxWidth: '82%'
  },
  promptPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textPrimary
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  visualWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    width: '100%',
    fontSize: 22,
    fontWeight: '800',
    color: palette.textPrimary,
    lineHeight: 28,
    textAlign: 'center'
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    flexShrink: 0
  },
  buttonFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 25
  },
  listenButton: {
    width: '100%',
    maxWidth: 220,
    borderRadius: 22,
    overflow: 'hidden'
  },
  listenFill: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  listenEmoji: {
    fontSize: 30
  },
  listenText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF'
  }
});
