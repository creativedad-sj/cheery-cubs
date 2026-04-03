import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useBeginningSounds } from '../../hooks/gameLogic/useBeginningSounds';
import { palette } from '../../theme/palette';

function SoundChoice({ option, compact, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.choiceWrap, compact && styles.choiceWrapCompact, pressed && styles.choicePressed]}>
      <LinearGradient colors={['#FFFFFF', '#EEF2FF']} style={styles.choiceCard}>
        <Text style={[styles.choiceEmoji, compact && styles.choiceEmojiCompact]}>{option.emoji}</Text>
        <Text style={styles.choiceWord}>{option.word}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function BeginningSoundsScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleOptionPress, speak } = useBeginningSounds();
  const { height } = useWindowDimensions();
  const compact = height < 760 || (round?.options.length || 0) > 3;

  if (!round) {
    return null;
  }

  return (
    <Screen>
      <GameHeader
        title="Beginning Sounds"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#EEF2FF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Listen to the first sound</Text>
          <Text style={styles.promptTitle}>Which picture starts with {round.sound}?</Text>
          <Text style={styles.promptBody}>Listen for the beginning sound, then choose the matching picture.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Which picture starts with ${round.phrase}?`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#EEF2FF', '#E0E7FF']} style={styles.stageCard}>
        <View style={styles.soundBadge}>
          <Text style={styles.soundLetter}>{round.sound}</Text>
          <Text style={styles.soundHelper}>starts with {round.phrase}</Text>
        </View>

        <View style={[styles.choiceGrid, compact && styles.choiceGridCompact]}>
          {round.options.map((option) => (
            <SoundChoice key={option.word} option={option} compact={compact} onPress={() => handleOptionPress(option)} />
          ))}
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Say the word out loud. What sound do you hear first?</Text>
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
    fontSize: 26,
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
  soundBadge: {
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 14
  },
  soundLetter: {
    fontSize: 46,
    fontWeight: '900',
    color: '#4338CA'
  },
  soundHelper: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '800',
    color: palette.textSecondary
  },
  choiceGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12
  },
  choiceGridCompact: {
    gap: 10
  },
  choiceWrap: {
    width: '30%'
  },
  choiceWrapCompact: {
    width: '46%'
  },
  choiceCard: {
    minHeight: 118,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16
  },
  choicePressed: {
    transform: [{ scale: 0.97 }]
  },
  choiceEmoji: {
    fontSize: 40
  },
  choiceEmojiCompact: {
    fontSize: 34
  },
  choiceWord: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: palette.textPrimary,
    textAlign: 'center'
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

