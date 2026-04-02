import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useShadowMatch } from '../../hooks/gameLogic/useShadowMatch';
import { palette } from '../../theme/palette';

function ChoiceCard({ item, compact, highlighted, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.choiceCard,
        compact && styles.choiceCardCompact,
        highlighted && styles.choiceCardWrong,
        pressed && styles.choiceCardPressed
      ]}
    >
      <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.choiceFill}>
        <View style={styles.choiceIconWrap}>
          <MaterialCommunityIcons name={item.icon} size={compact ? 38 : 44} color={item.color} />
        </View>
        <Text style={styles.choiceLabel}>{item.name}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function ShadowMatchScreen({ navigation }) {
  const { themeName, targetItem, options, revealedItem, score, feedback, shakeId, showConfetti, handleOptionPress, speak } = useShadowMatch();
  const { height } = useWindowDimensions();
  const compact = options.length >= 4 || height < 760;

  return (
    <Screen>
      <GameHeader
        title="Shadow Studio"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>{themeName}</Text>
          <Text style={styles.promptTitle}>Match the shadow</Text>
          <Text style={styles.promptBody}>Look at the dark shape, then tap the picture with the same outline.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Match the shadow from ${themeName}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#111827', '#334155']} style={styles.stageCard}>
        <Text style={styles.stageTitle}>Shadow wall</Text>

        <View style={styles.stageSpot}>
          <View style={styles.shadowGlow} />
          <MaterialCommunityIcons
            name={targetItem?.icon || 'help-circle'}
            size={118}
            color={revealedItem ? revealedItem.color : '#020617'}
            style={revealedItem ? styles.revealedShadow : styles.shadowIcon}
          />
        </View>

        <View style={styles.stageHint}>
          <Text style={styles.stageHintText}>No need to try pieces on top. Just find the matching silhouette.</Text>
        </View>

        <View style={[styles.choicesRow, compact && styles.choicesRowCompact]}>
          {options.map((item) => (
            <ChoiceCard
              key={item.id}
              item={item}
              compact={compact}
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
  stageTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E2E8F0',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10
  },
  stageSpot: {
    minHeight: 180,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden'
  },
  shadowGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  shadowIcon: {
    opacity: 0.96
  },
  revealedShadow: {
    opacity: 1
  },
  stageHint: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12
  },
  stageHintText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: '#E2E8F0',
    textAlign: 'center'
  },
  choicesRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    gap: 10
  },
  choicesRowCompact: {
    gap: 8
  },
  choiceCard: {
    width: '46%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  choiceCardCompact: {
    width: '47%'
  },
  choiceFill: {
    minHeight: 96,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  choiceIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  choiceLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  choiceCardWrong: {
    borderWidth: 3,
    borderColor: palette.error
  },
  choiceCardPressed: {
    transform: [{ scale: 0.97 }]
  }
});
