import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useNumberMatch } from '../../hooks/gameLogic/useNumberMatch';
import { palette } from '../../theme/palette';

function NumberChoiceCard({ value, compact, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.choiceWrap, compact && styles.choiceWrapCompact, pressed && styles.choicePressed]}>
      <LinearGradient colors={['#FFFFFF', '#DBEAFE']} style={styles.choiceCard}>
        <Text style={[styles.choiceNumber, compact && styles.choiceNumberCompact]}>{value}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function NumberMatchScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleOptionPress, speak } = useNumberMatch();
  const { height } = useWindowDimensions();
  const compact = round.count >= 7 || height < 760;

  return (
    <Screen>
      <GameHeader
        title="Number Match"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#ECFEFF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Count and match</Text>
          <Text style={styles.promptTitle}>How many?</Text>
          <Text style={styles.promptBody}>Count the {round.theme.name} and tap the number that matches.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`How many ${round.theme.name} do you see?`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={['#06B6D4', '#3B82F6']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>{'\u{1F50A}'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#ECFEFF', '#DBEAFE']} style={styles.stageCard}>
        <View style={[styles.objectGrid, compact && styles.objectGridCompact]}>
          {Array.from({ length: round.count }, (_, index) => (
            <View key={`${round.theme.name}-${index}`} style={[styles.objectBubble, compact && styles.objectBubbleCompact]}>
              <Text style={[styles.objectEmoji, compact && styles.objectEmojiCompact]}>{round.theme.emoji}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.choiceRow, round.options.length > 3 && styles.choiceRowWrap]}>
          {round.options.map((option) => (
            <NumberChoiceCard
              key={option}
              value={option}
              compact={round.options.length > 3}
              onPress={() => handleOptionPress(option)}
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
  objectGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12,
    paddingHorizontal: 4
  },
  objectGridCompact: {
    gap: 10
  },
  objectBubble: {
    width: '21%',
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.84)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  objectBubbleCompact: {
    width: '20%'
  },
  objectEmoji: {
    fontSize: 30
  },
  objectEmojiCompact: {
    fontSize: 26
  },
  choiceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12
  },
  choiceRowWrap: {
    flexWrap: 'wrap'
  },
  choiceWrap: {
    flex: 1,
    maxWidth: 120
  },
  choiceWrapCompact: {
    flexBasis: '45%'
  },
  choiceCard: {
    borderRadius: 24,
    minHeight: 88,
    alignItems: 'center',
    justifyContent: 'center'
  },
  choicePressed: {
    transform: [{ scale: 0.97 }]
  },
  choiceNumber: {
    fontSize: 34,
    fontWeight: '900',
    color: palette.textPrimary
  },
  choiceNumberCompact: {
    fontSize: 30
  }
});
