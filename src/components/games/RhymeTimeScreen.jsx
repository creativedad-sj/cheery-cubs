import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useRhymeTime } from '../../hooks/gameLogic/useRhymeTime';
import { palette } from '../../theme/palette';

function ChoiceCard({ option, compact, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.choiceWrap, compact && styles.choiceWrapCompact, pressed && styles.choicePressed]}>
      <LinearGradient colors={['#FFFFFF', '#FDF2F8']} style={styles.choiceCard}>
        <Text style={[styles.choiceEmoji, compact && styles.choiceEmojiCompact]}>{option.emoji}</Text>
        <Text style={styles.choiceWord}>{option.word}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function RhymeTimeScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleOptionPress, speak } = useRhymeTime();
  const { height } = useWindowDimensions();
  const compact = height < 760 || (round?.options.length || 0) > 3;

  if (!round) {
    return null;
  }

  return (
    <Screen>
      <GameHeader
        title="Rhyme Time"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FDF2F8']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Listen for the rhyme</Text>
          <Text style={styles.promptTitle}>What rhymes with {round.clue.word}?</Text>
          <Text style={styles.promptBody}>Pick the picture that sounds like the same ending word.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`What rhymes with ${round.clue.word}?`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#FDF2F8', '#FCE7F3']} style={styles.stageCard}>
        <View style={styles.clueCard}>
          <Text style={styles.clueEmoji}>{round.clue.emoji}</Text>
          <Text style={styles.clueWord}>{round.clue.word}</Text>
        </View>

        <View style={[styles.choiceGrid, compact && styles.choiceGridCompact]}>
          {round.options.map((option) => (
            <ChoiceCard key={option.word} option={option} compact={compact} onPress={() => handleOptionPress(option)} />
          ))}
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Say the words out loud if you want a hint. Do they sound alike at the end?</Text>
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
  clueCard: {
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginBottom: 14
  },
  clueEmoji: {
    fontSize: 54
  },
  clueWord: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: '900',
    color: palette.textPrimary
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

