import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useMakeTen } from '../../hooks/gameLogic/useMakeTen';
import { palette } from '../../theme/palette';

function NumberChoice({ value, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.choiceWrap, pressed && styles.choicePressed]}>
      <LinearGradient colors={['#FFFFFF', '#ECFDF5']} style={styles.choiceCard}>
        <Text style={styles.choiceValue}>{value}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function MakeTenScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleOptionPress, speak } = useMakeTen();

  return (
    <Screen>
      <GameHeader
        title="Make 10"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#ECFDF5']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Build a ten</Text>
          <Text style={styles.promptTitle}>What goes with {round.leftValue} to make 10?</Text>
          <Text style={styles.promptBody}>Look at the number train and choose the missing part.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`What goes with ${round.leftValue} to make 10?`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#ECFDF5', '#D1FAE5']} style={styles.stageCard}>
        <View style={styles.trainRow}>
          <View style={styles.numberCar}>
            <Text style={styles.numberCarValue}>{round.leftValue}</Text>
          </View>
          <View style={[styles.numberCar, styles.missingCar]}>
            <Text style={styles.missingMark}>?</Text>
          </View>
          <View style={styles.tenCar}>
            <Text style={styles.tenLabel}>10</Text>
          </View>
        </View>

        <View style={styles.choiceRow}>
          {round.options.map((value) => (
            <NumberChoice key={value} value={value} onPress={() => handleOptionPress(value)} />
          ))}
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>A full ten can be split into two parts. Which part is missing?</Text>
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
  trainRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  numberCar: {
    width: 86,
    height: 86,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberCarValue: {
    fontSize: 38,
    fontWeight: '900',
    color: palette.textPrimary
  },
  missingCar: {
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#22C55E'
  },
  missingMark: {
    fontSize: 34,
    fontWeight: '900',
    color: '#16A34A'
  },
  tenCar: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tenLabel: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF'
  },
  choiceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12
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

