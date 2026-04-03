import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useWhichHasMore } from '../../hooks/gameLogic/useWhichHasMore';
import { palette } from '../../theme/palette';

function CountGroup({ title, count, emoji, colors, compact, onPress }) {
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.groupWrap, pressed && styles.groupPressed]}>
      <LinearGradient colors={colors} style={styles.groupCard}>
        <Text style={styles.groupTitle}>{title}</Text>
        <View style={[styles.groupGrid, compact && styles.groupGridCompact]}>
          {items.map((item) => (
            <Text key={item} style={[styles.groupEmoji, compact && styles.groupEmojiCompact]}>{emoji}</Text>
          ))}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function WhichHasMoreScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleChoice, speak } = useWhichHasMore();
  const { height } = useWindowDimensions();
  const compact = height < 760 || Math.max(round.leftCount, round.rightCount) >= 7;
  const promptTitle =
    round.promptType === 'more'
      ? 'Which side has more?'
      : round.promptType === 'fewer'
        ? 'Which side has fewer?'
        : 'Do they match?';

  return (
    <Screen>
      <GameHeader
        title="Which Has More?"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#EFF6FF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Compare the groups</Text>
          <Text style={styles.promptTitle}>{promptTitle}</Text>
          <Text style={styles.promptBody}>Look carefully and choose the correct side.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(promptTitle, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#EFF6FF', '#DBEAFE']} style={styles.stageCard}>
        <View style={styles.groupsRow}>
          <CountGroup
            title="Left"
            count={round.leftCount}
            emoji={round.theme.emoji}
            compact={compact}
            colors={['#FFFFFF', '#E0F2FE']}
            onPress={() => handleChoice('left')}
          />
          <CountGroup
            title="Right"
            count={round.rightCount}
            emoji={round.theme.emoji}
            compact={compact}
            colors={['#FFFFFF', '#FEF3C7']}
            onPress={() => handleChoice('right')}
          />
        </View>

        <View style={styles.footerRow}>
          <View style={styles.footerHint}>
            <Text style={styles.footerHintText}>Count what you see, then choose the answer.</Text>
          </View>

          {round.promptType === 'equal' ? (
            <Pressable onPress={() => handleChoice('equal')} style={styles.equalButton}>
              <LinearGradient colors={['#A78BFA', '#8B5CF6']} style={styles.equalFill}>
                <Text style={styles.equalText}>Same</Text>
              </LinearGradient>
            </Pressable>
          ) : null}
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
  groupsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12
  },
  groupWrap: {
    flex: 1
  },
  groupCard: {
    flex: 1,
    borderRadius: 28,
    padding: 14
  },
  groupPressed: {
    transform: [{ scale: 0.97 }]
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center',
    marginBottom: 10
  },
  groupGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10
  },
  groupGridCompact: {
    gap: 8
  },
  groupEmoji: {
    fontSize: 30
  },
  groupEmojiCompact: {
    fontSize: 26
  },
  footerRow: {
    gap: 10,
    marginTop: 12
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
  },
  equalButton: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  equalFill: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  equalText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF'
  }
});

