import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useComposeAndDecompose } from '../../hooks/gameLogic/useComposeAndDecompose';
import { palette } from '../../theme/palette';

function NumberChoice({ value, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.choiceWrap, pressed && styles.choicePressed]}>
      <LinearGradient colors={['#FFFFFF', '#D1FAE5']} style={styles.choiceCard}>
        <Text style={styles.choiceValue}>{value}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function ComposeAndDecomposeScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleOptionPress, speak } = useComposeAndDecompose();

  return (
    <Screen>
      <GameHeader
        title="Compose & Decompose"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#ECFDF5']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Build the whole number</Text>
          <Text style={styles.promptTitle}>What goes with {round.knownPart} to make {round.total}?</Text>
          <Text style={styles.promptBody}>Numbers can split into two parts. Choose the missing part.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`What goes with ${round.knownPart} to make ${round.total}?`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#ECFDF5', '#D1FAE5']} style={styles.stageCard}>
        <View style={styles.totalBadge}>
          <Text style={styles.totalLabel}>Whole number</Text>
          <Text style={styles.totalValue}>{round.total}</Text>
        </View>

        <View style={styles.partsRow}>
          <View style={styles.partCard}>
            <Text style={styles.partValue}>{round.knownPart}</Text>
            <Text style={styles.partLabel}>Known part</Text>
          </View>
          <View style={[styles.partCard, styles.missingPartCard]}>
            <Text style={styles.partQuestion}>?</Text>
            <Text style={styles.partLabel}>Missing part</Text>
          </View>
        </View>

        <View style={styles.choiceRow}>
          {round.options.map((value) => (
            <NumberChoice key={value} value={value} onPress={() => handleOptionPress(value)} />
          ))}
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Small parts can come together to make a bigger number.</Text>
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
  totalBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase'
  },
  totalValue: {
    fontSize: 34,
    fontWeight: '900',
    color: palette.textPrimary
  },
  partsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    marginTop: 14
  },
  partCard: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.84)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  missingPartCard: {
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#10B981'
  },
  partValue: {
    fontSize: 46,
    fontWeight: '900',
    color: palette.textPrimary
  },
  partQuestion: {
    fontSize: 42,
    fontWeight: '900',
    color: '#10B981'
  },
  partLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '800',
    color: palette.textSecondary
  },
  choiceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 14
  },
  choiceWrap: {
    flex: 1,
    maxWidth: 108
  },
  choiceCard: {
    minHeight: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  choicePressed: {
    transform: [{ scale: 0.97 }]
  },
  choiceValue: {
    fontSize: 34,
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

