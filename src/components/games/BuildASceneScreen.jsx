import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useBuildAScene } from '../../hooks/gameLogic/useBuildAScene';
import { palette } from '../../theme/palette';

function SceneSlot({ label, item, compact }) {
  return (
    <LinearGradient colors={item ? ['#FFFFFF', '#FEF3C7'] : ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.94)']} style={[styles.slotCard, compact && styles.slotCardCompact]}>
      <Text style={[styles.slotEmoji, compact && styles.slotEmojiCompact]}>{item ? item.emoji : '\u2753'}</Text>
      <Text style={styles.slotLabel}>{label}</Text>
    </LinearGradient>
  );
}

function TrayItem({ item, compact, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.trayItemWrap, compact && styles.trayItemWrapCompact, pressed && styles.trayItemPressed]}>
      <LinearGradient colors={['#FFFFFF', '#FDE68A']} style={styles.trayItemCard}>
        <Text style={[styles.trayItemEmoji, compact && styles.trayItemEmojiCompact]}>{item.emoji}</Text>
        <Text style={styles.trayItemName}>{item.name}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function BuildASceneScreen({ navigation }) {
  const { scene, tray, placed, targetItem, score, feedback, showConfetti, handleItemPress, speak, slotLabels } = useBuildAScene();
  const { height } = useWindowDimensions();
  const compact = height < 760;
  const slotOrder = scene.items.map((item) => item.slot);

  return (
    <Screen>
      <GameHeader
        title="Build a Scene"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Scene builder</Text>
          <Text style={styles.promptTitle}>{scene.title}</Text>
          <Text style={styles.promptBody}>
            {targetItem ? `Tap the ${targetItem.name} next to finish the picture.` : 'You built the whole scene.'}
          </Text>
        </LinearGradient>

        <Pressable onPress={() => speak(scene.prompt, 'question')} style={styles.soundButton}>
          <LinearGradient colors={['#F59E0B', '#FB7185']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>{'\u{1F50A}'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFF7ED', '#FFEDD5']} style={styles.stageCard}>
        <View style={[styles.slotGrid, compact && styles.slotGridCompact]}>
          {slotOrder.map((slot) => (
            <SceneSlot key={slot} label={slotLabels[slot] || slot} item={placed[slot]} compact={compact} />
          ))}
        </View>

        <View style={styles.trayArea}>
          <Text style={styles.trayTitle}>Choose the next picture piece</Text>
          <View style={[styles.trayGrid, compact && styles.trayGridCompact]}>
            {tray.map((item) => (
              <TrayItem key={item.id} item={item} compact={compact} onPress={() => handleItemPress(item)} />
            ))}
          </View>
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
  slotGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12
  },
  slotGridCompact: {
    gap: 10
  },
  slotCard: {
    width: '30%',
    minHeight: 112,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  slotCardCompact: {
    minHeight: 100
  },
  slotEmoji: {
    fontSize: 38
  },
  slotEmojiCompact: {
    fontSize: 34
  },
  slotLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  trayArea: {
    flex: 1,
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.76)',
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  trayTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: palette.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  trayGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12
  },
  trayGridCompact: {
    gap: 10
  },
  trayItemWrap: {
    width: '31%'
  },
  trayItemWrapCompact: {
    width: '30%'
  },
  trayItemCard: {
    borderRadius: 24,
    minHeight: 112,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  trayItemPressed: {
    transform: [{ scale: 0.97 }]
  },
  trayItemEmoji: {
    fontSize: 36
  },
  trayItemEmojiCompact: {
    fontSize: 32
  },
  trayItemName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center'
  }
});
