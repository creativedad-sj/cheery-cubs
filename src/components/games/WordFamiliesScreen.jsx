import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useWordFamilies } from '../../hooks/gameLogic/useWordFamilies';
import { palette } from '../../theme/palette';

function FamilyChoice({ option, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.choiceWrap, pressed && styles.choicePressed]}>
      <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.choiceCard}>
        <Text style={styles.choiceEmoji}>{option.emoji}</Text>
        <Text style={styles.choiceWord}>{option.word}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function WordFamiliesScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleOptionPress, speak } = useWordFamilies();

  if (!round) {
    return null;
  }

  return (
    <Screen>
      <GameHeader
        title="Word Families"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Look for the same ending</Text>
          <Text style={styles.promptTitle}>Which word is in the “{round.family}” family?</Text>
          <Text style={styles.promptBody}>The picture clue helps show what sound family to look for.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Which word belongs in the ${round.family} family?`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFF7ED', '#FFEDD5']} style={styles.stageCard}>
        <View style={styles.clueCard}>
          <Text style={styles.clueEmoji}>{round.clue.emoji}</Text>
          <Text style={styles.clueWord}>{round.clue.word}</Text>
          <Text style={styles.clueFamily}>“{round.family}” family</Text>
        </View>

        <View style={styles.choiceRow}>
          {round.options.map((option) => (
            <FamilyChoice key={option.word} option={option} onPress={() => handleOptionPress(option)} />
          ))}
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Listen to the end of the word. Which one sounds the same?</Text>
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
    fontSize: 24,
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
    fontSize: 52
  },
  clueWord: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: '900',
    color: palette.textPrimary
  },
  clueFamily: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '800',
    color: palette.textSecondary
  },
  choiceRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12
  },
  choiceWrap: {
    flex: 1
  },
  choiceCard: {
    flex: 1,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16
  },
  choicePressed: {
    transform: [{ scale: 0.97 }]
  },
  choiceEmoji: {
    fontSize: 38
  },
  choiceWord: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '900',
    color: palette.textPrimary
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
