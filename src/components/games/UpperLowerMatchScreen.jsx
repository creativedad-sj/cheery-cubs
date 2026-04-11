import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useUpperLowerMatch } from '../../hooks/gameLogic/useUpperLowerMatch';
import { palette } from '../../theme/palette';

function LetterOption({ value, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.optionWrap, pressed && styles.optionPressed]}>
      <LinearGradient colors={['#FFFFFF', '#DBEAFE']} style={styles.optionCard}>
        <Text style={styles.optionText}>{value}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function UpperLowerMatchScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleOptionPress, speak } = useUpperLowerMatch();

  return (
    <Screen>
      <GameHeader
        title="Upper & Lower Match"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#EFF6FF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Letter pairs</Text>
          <Text style={styles.promptTitle}>Find the {round.prompt} match</Text>
          <Text style={styles.promptBody}>Tap the {round.prompt} letter that matches this one.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Find the ${round.prompt} match for ${round.target}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={['#2563EB', '#60A5FA']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>{'\u{1F50A}'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#EFF6FF', '#DBEAFE']} style={styles.stageCard}>
        <View style={styles.targetCard}>
          <Text style={styles.targetLabel}>Match this letter</Text>
          <Text style={styles.targetLetter}>{round.target}</Text>
        </View>

        <View style={styles.optionsGrid}>
          {round.options.map((option) => (
            <LetterOption key={option} value={option} onPress={() => handleOptionPress(option)} />
          ))}
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Uppercase letters are the tall big letters. Lowercase letters are the smaller letter friends.</Text>
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
  targetCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderRadius: 30,
    paddingVertical: 18,
    marginBottom: 12
  },
  targetLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase'
  },
  targetLetter: {
    marginTop: 6,
    fontSize: 76,
    fontWeight: '900',
    color: '#1D4ED8'
  },
  optionsGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12
  },
  optionWrap: {
    width: '46%'
  },
  optionCard: {
    borderRadius: 26,
    minHeight: 110,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionPressed: {
    transform: [{ scale: 0.97 }]
  },
  optionText: {
    fontSize: 52,
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
