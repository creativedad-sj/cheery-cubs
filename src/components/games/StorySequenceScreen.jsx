import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useStorySequence } from '../../hooks/gameLogic/useStorySequence';
import { palette } from '../../theme/palette';

function StoryCard({ item, muted, onPress }) {
  const content = (
    <LinearGradient colors={muted ? ['#F8FAFC', '#EEF2F7'] : ['#FFFFFF', '#EDE9FE']} style={styles.storyCard}>
      <Text style={styles.storyEmoji}>{item?.emoji || '•'}</Text>
      <Text style={styles.storyLabel}>{item?.label || 'Next'}</Text>
    </LinearGradient>
  );

  if (!onPress) {
    return <View style={styles.storyWrap}>{content}</View>;
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.storyWrap, pressed && styles.storyPressed]}>
      {content}
    </Pressable>
  );
}

export function StorySequenceScreen({ navigation }) {
  const { round, options, placed, score, feedback, showConfetti, handleOptionPress, speak } = useStorySequence();
  const placeholders = Array.from({ length: round.steps.length }, (_, index) => placed[index] || null);

  return (
    <Screen>
      <GameHeader
        title="Story Sequence"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#F5F3FF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Put the story in order</Text>
          <Text style={styles.promptTitle}>{round.title}</Text>
          <Text style={styles.promptBody}>Tap what happens first, then next, then last.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Put the ${round.title.toLowerCase()} in order.`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#F5F3FF', '#EDE9FE']} style={styles.stageCard}>
        <View style={styles.sequenceRow}>
          {placeholders.map((item, index) => (
            <StoryCard key={`placed-${index}`} item={item} muted={!item} />
          ))}
        </View>

        <View style={styles.optionsRow}>
          {options.map((item) => (
            <StoryCard key={item.id} item={item} onPress={() => handleOptionPress(item)} />
          ))}
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Think about what would happen first in real life.</Text>
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
  sequenceRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14
  },
  optionsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  storyWrap: {
    flex: 1
  },
  storyCard: {
    minHeight: 124,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },
  storyEmoji: {
    fontSize: 40
  },
  storyLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  storyPressed: {
    transform: [{ scale: 0.97 }]
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
