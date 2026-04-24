import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useLetterHunt } from '../../hooks/gameLogic/useLetterHunt';
import { palette } from '../../theme/palette';

const bubblePalettes = [
  ['#FFFFFF', '#EFF6FF'],
  ['#FFFFFF', '#FEF3C7'],
  ['#FFFFFF', '#FCE7F3'],
  ['#FFFFFF', '#DCFCE7'],
  ['#FFFFFF', '#E0E7FF']
];

function LetterBubble({ item, index, onPress, highlighted, compact }) {
  const colors = item.collected ? ['#BBF7D0', '#86EFAC'] : bubblePalettes[index % bubblePalettes.length];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bubble,
        compact && styles.bubbleCompact,
        item.collected && styles.bubbleCollected,
        highlighted && styles.bubbleWrong,
        pressed && !item.collected && styles.bubblePressed
      ]}
      disabled={item.collected}
    >
      <LinearGradient colors={colors} style={styles.bubbleFill}>
        <Text style={[styles.bubbleLetter, compact && styles.bubbleLetterCompact, item.collected && styles.bubbleLetterCollected]}>
          {item.letter}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

export function LetterHuntScreen({ navigation }) {
  const { targetLetter, targetVariants, mixCase, targetCount, collectedCount, options, score, feedback, shakeId, showConfetti, handleOptionPress, speak } = useLetterHunt();
  const { height } = useWindowDimensions();
  const compact = options.length >= 9 || height < 760;
  const extraCompact = options.length >= 12;

  return (
    <Screen>
      <GameHeader
        title="Letter Garden"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Collect the letter</Text>
          <Text style={styles.promptTitle}>Find all {targetLetter}s</Text>
          <Text style={styles.promptBody}>
            {mixCase ? `Tap every matching ${targetVariants.join(' / ')} in the garden.` : 'Tap every matching letter in the garden.'}
          </Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Find all ${targetLetter}s`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>{'\u{1F50A}'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#F0FDF4', '#DCFCE7']} style={styles.stageCard}>
        <View style={styles.stageTopRow}>
          <View style={styles.targetMedal}>
            <Text style={styles.targetLabel}>Target</Text>
            <View style={styles.targetVariantsRow}>
              {targetVariants.map((variant) => (
                <View key={variant} style={[styles.targetBubble, extraCompact && styles.targetBubbleCompact]}>
                  <Text style={[styles.targetLetter, extraCompact && styles.targetLetterCompact]}>{variant}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.basketCard}>
            <Text style={styles.basketEmoji}>{'\u{1F9FA}'}</Text>
            <Text style={styles.basketCount}>
              {collectedCount}/{targetCount}
            </Text>
            <Text style={styles.basketText}>Collected</Text>
          </View>
        </View>

        <View style={[styles.gardenGrid, compact && styles.gardenGridCompact]}>
          {options.map((item, index) => (
            <LetterBubble
              key={item.id}
              item={item}
              index={index}
              compact={compact || extraCompact}
              highlighted={shakeId === item.id}
              onPress={() => handleOptionPress(item)}
            />
          ))}
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
  stageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14
  },
  targetMedal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 24,
    padding: 12
  },
  targetLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8
  },
  targetVariantsRow: {
    flexDirection: 'row',
    gap: 8
  },
  targetBubble: {
    width: 72,
    height: 72,
    borderRadius: 26,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  targetBubbleCompact: {
    width: 62,
    height: 62,
    borderRadius: 22
  },
  targetLetter: {
    fontSize: 38,
    fontWeight: '900',
    color: '#1D4ED8'
  },
  targetLetterCompact: {
    fontSize: 32
  },
  basketCard: {
    width: 120,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  basketEmoji: {
    fontSize: 30,
    marginBottom: 2
  },
  basketCount: {
    fontSize: 28,
    fontWeight: '900',
    color: palette.textPrimary
  },
  basketText: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase'
  },
  gardenGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 12
  },
  gardenGridCompact: {
    gap: 10
  },
  bubble: {
    width: '29%',
    aspectRatio: 1,
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  bubbleCompact: {
    width: '22%'
  },
  bubbleFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bubbleLetter: {
    fontSize: 40,
    fontWeight: '900',
    color: '#1E293B'
  },
  bubbleLetterCompact: {
    fontSize: 30
  },
  bubbleCollected: {
    opacity: 0.92
  },
  bubbleLetterCollected: {
    color: '#166534'
  },
  bubbleWrong: {
    borderWidth: 3,
    borderColor: palette.error
  },
  bubblePressed: {
    transform: [{ scale: 0.96 }]
  },
});
