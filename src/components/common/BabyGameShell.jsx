import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameHeader } from './GameHeader';
import { Screen } from './Screen';
import { palette } from '../../theme/palette';

export function BabyGameShell({
  title,
  navigation,
  eyebrow,
  promptTitle,
  promptBody,
  onSpeak,
  stageColors,
  footerTip,
  children
}) {
  return (
    <Screen>
      <GameHeader title={title} onBack={() => navigation.navigate('Home')} onSettings={() => navigation.navigate('Settings')} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>{eyebrow}</Text>
          <Text style={styles.promptTitle}>{promptTitle}</Text>
          <Text style={styles.promptBody}>{promptBody}</Text>
        </LinearGradient>

        <Pressable onPress={onSpeak} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={stageColors} style={styles.stageCard}>
        <View style={styles.coPlayPill}>
          <Text style={styles.coPlayText}>Parent + baby co-play</Text>
        </View>
        <View style={styles.stageContent}>{children}</View>
        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>{footerTip}</Text>
        </View>
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  promptRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    marginBottom: 12
  },
  promptCard: {
    flex: 1,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  promptEyebrow: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 6
  },
  promptTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: palette.textPrimary,
    marginBottom: 4
  },
  promptBody: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: palette.textSecondary
  },
  soundButton: {
    width: 64,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  soundFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  soundEmoji: {
    fontSize: 28
  },
  stageCard: {
    flex: 1,
    borderRadius: 32,
    padding: 14,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  coPlayPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  coPlayText: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  stageContent: {
    flex: 1,
    marginTop: 12
  },
  footerHint: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  footerHintText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: palette.textSecondary,
    textAlign: 'center'
  }
});
