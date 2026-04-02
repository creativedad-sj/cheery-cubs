import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useCountAndPack } from '../../hooks/gameLogic/useCountAndPack';
import { palette } from '../../theme/palette';

function PackItem({ emoji, selected, compact, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.itemWrap, compact && styles.itemWrapCompact, pressed && styles.itemPressed]}>
      <LinearGradient colors={selected ? ['#BBF7D0', '#86EFAC'] : ['#FFFFFF', '#FEF3C7']} style={[styles.itemCard, selected && styles.itemCardSelected]}>
        <Text style={[styles.itemEmoji, compact && styles.itemEmojiCompact]}>{emoji}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function CountAndPackScreen({ navigation }) {
  const { theme, targetCount, items, selectedCount, score, feedback, showConfetti, handleItemPress, handlePack, speak } = useCountAndPack();
  const { height } = useWindowDimensions();
  const compact = items.length >= 10 || height < 760;

  return (
    <Screen>
      <GameHeader
        title="Count & Pack"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Pack the basket</Text>
          <Text style={styles.promptTitle}>Pack {targetCount}</Text>
          <Text style={styles.promptBody}>Tap exactly {targetCount} {theme.name}, then press Pack it.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Pack ${targetCount} ${theme.name}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFF7ED', '#FFEDD5']} style={styles.stageCard}>
        <View style={styles.topRow}>
          <View style={styles.goalCard}>
            <Text style={styles.goalLabel}>Pack this many</Text>
            <Text style={styles.goalCount}>{targetCount}</Text>
            <Text style={styles.goalEmoji}>{theme.emoji}</Text>
          </View>

          <View style={styles.basketCard}>
            <Text style={styles.basketEmoji}>🧺</Text>
            <Text style={styles.basketCount}>{selectedCount}</Text>
            <Text style={styles.basketText}>in basket</Text>
          </View>
        </View>

        <View style={[styles.itemGrid, compact && styles.itemGridCompact]}>
          {items.map((item) => (
            <PackItem
              key={item.id}
              emoji={theme.emoji}
              selected={item.selected}
              compact={compact}
              onPress={() => handleItemPress(item.id)}
            />
          ))}
        </View>

        <Pressable onPress={handlePack} style={styles.packButton}>
          <LinearGradient colors={['#FB7185', '#F97316']} style={styles.packFill}>
            <Text style={styles.packText}>Pack it</Text>
          </LinearGradient>
        </Pressable>
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
  topRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  goalCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },
  goalLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase'
  },
  goalCount: {
    marginTop: 4,
    fontSize: 34,
    fontWeight: '900',
    color: palette.textPrimary
  },
  goalEmoji: {
    fontSize: 26
  },
  basketCard: {
    width: 122,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  basketEmoji: {
    fontSize: 28
  },
  basketCount: {
    fontSize: 30,
    fontWeight: '900',
    color: palette.textPrimary
  },
  basketText: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase'
  },
  itemGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12
  },
  itemGridCompact: {
    gap: 10
  },
  itemWrap: {
    width: '22%',
    aspectRatio: 1
  },
  itemWrapCompact: {
    width: '21%'
  },
  itemCard: {
    flex: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  itemCardSelected: {
    borderWidth: 3,
    borderColor: '#16A34A'
  },
  itemEmoji: {
    fontSize: 32
  },
  itemEmojiCompact: {
    fontSize: 28
  },
  itemPressed: {
    transform: [{ scale: 0.96 }]
  },
  packButton: {
    marginTop: 12,
    borderRadius: 22,
    overflow: 'hidden'
  },
  packFill: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  packText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF'
  }
});
