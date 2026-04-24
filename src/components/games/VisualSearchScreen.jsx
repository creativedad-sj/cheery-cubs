import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useVisualSearch } from '../../hooks/gameLogic/useVisualSearch';
import { palette } from '../../theme/palette';

function SearchTile({ item, compact, columns, onPress }) {
  const tileWidth = columns >= 4 ? '22%' : '30%';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tileWrap, { width: tileWidth }, compact && styles.tileWrapCompact, pressed && styles.pressed]}
    >
      <LinearGradient colors={['#FFFFFF', '#EFF6FF']} style={styles.tileCard}>
        <Text style={[styles.tileEmoji, compact && styles.tileEmojiCompact]}>{item.emoji}</Text>
        <Text style={styles.tileLabel}>{item.name}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function VisualSearchScreen({ navigation }) {
  const { round, score, feedback, showConfetti, handleChoice, speak } = useVisualSearch();
  const { height } = useWindowDimensions();
  const compact = round.cells.length > 9 || height < 760;

  return (
    <Screen>
      <GameHeader
        title="Visual Search"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#EEF2FF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Focus game</Text>
          <Text style={styles.promptTitle}>Find the {round.target.name}</Text>
          <Text style={styles.promptBody}>Look across the whole picture wall and tap the one that matches.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Find the ${round.target.name}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={['#6366F1', '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>{'\u{1F50A}'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#EEF2FF', '#DBEAFE']} style={styles.stageCard}>
        <View style={styles.targetChip}>
          <Text style={styles.targetEmoji}>{round.target.emoji}</Text>
          <Text style={styles.targetText}>Tap this one</Text>
        </View>

        <View style={[styles.grid, compact && styles.gridCompact]}>
          {round.cells.map((item, index) => (
            <SearchTile key={`${item.id}-${index}`} item={item} compact={compact} columns={round.columns} onPress={() => handleChoice(item)} />
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
    fontSize: 24,
    fontWeight: '900',
    color: palette.textPrimary,
    marginBottom: 4,
    textTransform: 'capitalize'
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
  targetChip: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12
  },
  targetEmoji: {
    fontSize: 26
  },
  targetText: {
    fontSize: 14,
    fontWeight: '800',
    color: palette.textPrimary
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10
  },
  gridCompact: {
    gap: 8
  },
  tileWrap: {
    minWidth: 72
  },
  tileWrapCompact: {
    minWidth: 72
  },
  tileCard: {
    minHeight: 96,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 10
  },
  tileEmoji: {
    fontSize: 34
  },
  tileEmojiCompact: {
    fontSize: 28
  },
  tileLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  pressed: {
    transform: [{ scale: 0.97 }]
  }
});
