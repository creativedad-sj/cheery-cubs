import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useShapeSortYard } from '../../hooks/gameLogic/useShapeSortYard';
import { palette } from '../../theme/palette';

function BucketCard({ title, helper, colors, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.bucketWrap, pressed && styles.bucketPressed]}>
      <LinearGradient colors={colors} style={styles.bucketCard}>
        <Text style={styles.bucketTitle}>{title}</Text>
        <Text style={styles.bucketHelper}>{helper}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function ShapeSortYardScreen({ navigation }) {
  const { currentShape, currentIndex, totalShapes, score, feedback, showConfetti, handleBucketPress, speak } = useShapeSortYard();

  return (
    <Screen>
      <GameHeader
        title="Shape Sort Yard"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#F5F3FF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Sort the shapes</Text>
          <Text style={styles.promptTitle}>Where does this shape go?</Text>
          <Text style={styles.promptBody}>Round shapes go in one tray. Shapes with corners go in the other.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak('Where does this shape go?', 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#F5F3FF', '#EDE9FE']} style={styles.stageCard}>
        <View style={styles.progressChip}>
          <Text style={styles.progressText}>Shape {currentIndex + 1} of {totalShapes}</Text>
        </View>

        <View style={styles.shapeCard}>
          <Text style={[styles.shapeEmoji, { color: currentShape.color }]}>{currentShape.emoji}</Text>
          <Text style={styles.shapeName}>{currentShape.name}</Text>
        </View>

        <View style={styles.bucketRow}>
          <BucketCard
            title="Round tray"
            helper="No corners"
            colors={['#FFFFFF', '#DBEAFE']}
            onPress={() => handleBucketPress('round')}
          />
          <BucketCard
            title="Corners tray"
            helper="Has corners"
            colors={['#FFFFFF', '#FDE68A']}
            onPress={() => handleBucketPress('corners')}
          />
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Look at the shape closely. Is it smooth and round, or does it have corners?</Text>
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
  progressChip: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  progressText: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  shapeCard: {
    flex: 1,
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.84)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shapeEmoji: {
    fontSize: 112,
    fontWeight: '900'
  },
  shapeName: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '900',
    color: palette.textPrimary
  },
  bucketRow: {
    flexDirection: 'row',
    gap: 12
  },
  bucketWrap: {
    flex: 1
  },
  bucketCard: {
    borderRadius: 26,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bucketPressed: {
    transform: [{ scale: 0.97 }]
  },
  bucketTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  bucketHelper: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    color: palette.textSecondary,
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

