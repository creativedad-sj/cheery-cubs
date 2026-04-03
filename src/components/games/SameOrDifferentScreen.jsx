import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useSameOrDifferent } from '../../hooks/gameLogic/useSameOrDifferent';
import { palette } from '../../theme/palette';

function PictureCard({ item }) {
  return (
    <LinearGradient colors={['#FFFFFF', '#E0F2FE']} style={styles.pictureCard}>
      <Text style={styles.pictureEmoji}>{item.emoji}</Text>
      <Text style={styles.pictureLabel}>{item.name}</Text>
    </LinearGradient>
  );
}

export function SameOrDifferentScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleChoice, speak } = useSameOrDifferent();

  return (
    <Screen>
      <GameHeader
        title="Same or Different?"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#E0F2FE']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Compare the pictures</Text>
          <Text style={styles.promptTitle}>Same or different?</Text>
          <Text style={styles.promptBody}>Look carefully at both pictures, then choose your answer.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak('Are these the same or different?', 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#E0F2FE', '#DBEAFE']} style={styles.stageCard}>
        <View style={styles.picturesRow}>
          <PictureCard item={round.left} />
          <PictureCard item={round.right} />
        </View>

        <View style={styles.answerRow}>
          <Pressable onPress={() => handleChoice('same')} style={styles.answerWrap}>
            <LinearGradient colors={['#FFFFFF', '#DCFCE7']} style={styles.answerCard}>
              <Text style={styles.answerTitle}>Same</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={() => handleChoice('different')} style={styles.answerWrap}>
            <LinearGradient colors={['#FFFFFF', '#FEF3C7']} style={styles.answerCard}>
              <Text style={styles.answerTitle}>Different</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Do they match exactly, or is something different?</Text>
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
  picturesRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12
  },
  pictureCard: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureEmoji: {
    fontSize: 54
  },
  pictureLabel: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '900',
    color: palette.textPrimary
  },
  answerRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14
  },
  answerWrap: {
    flex: 1
  },
  answerCard: {
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  answerTitle: {
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
