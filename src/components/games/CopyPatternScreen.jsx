import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { patternPads, useCopyPattern } from '../../hooks/gameLogic/useCopyPattern';
import { palette } from '../../theme/palette';

function PatternPad({ pad, active, onPress, disabled }) {
  return (
    <Pressable onPress={disabled ? undefined : onPress} style={({ pressed }) => [styles.padWrap, !disabled && pressed && styles.pressed]}>
      <LinearGradient colors={active ? pad.colors : ['#FFFFFF', '#F8FAFC']} style={[styles.padCard, active && styles.padCardActive]}>
        <Text style={styles.padEmoji}>{pad.emoji}</Text>
        <Text style={styles.padLabel}>{pad.label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function CopyPatternScreen({ navigation }) {
  const { sequence, playerIndex, activePadId, previewPhase, score, feedback, showConfetti, handlePadPress } = useCopyPattern();

  return (
    <Screen>
      <GameHeader
        title="Copy the Pattern"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptCard}>
        <Text style={styles.promptEyebrow}>Memory pattern</Text>
        <Text style={styles.promptTitle}>{previewPhase ? 'Watch the pattern' : 'Now copy it'}</Text>
        <Text style={styles.promptBody}>
          {previewPhase
            ? 'The picture pads will light up one at a time.'
            : `Tap the same pattern. ${playerIndex} of ${sequence.length} copied.`}
        </Text>
      </View>

      <LinearGradient colors={['#F5F3FF', '#EDE9FE']} style={styles.stageCard}>
        <View style={styles.sequenceDots}>
          {sequence.map((padId, index) => (
            <View
              key={`${padId}-${index}`}
              style={[
                styles.sequenceDot,
                playerIndex > index && !previewPhase && styles.sequenceDotDone,
                activePadId === padId && styles.sequenceDotActive
              ]}
            />
          ))}
        </View>

        <View style={styles.padGrid}>
          {patternPads.map((pad) => (
            <PatternPad
              key={pad.id}
              pad={pad}
              active={activePadId === pad.id}
              disabled={previewPhase}
              onPress={() => handlePadPress(pad.id)}
            />
          ))}
        </View>
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  promptCard: {
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
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
  sequenceDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 14
  },
  sequenceDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.86)'
  },
  sequenceDotDone: {
    backgroundColor: '#22C55E'
  },
  sequenceDotActive: {
    backgroundColor: '#8B5CF6'
  },
  padGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12
  },
  padWrap: {
    width: '46%'
  },
  padCard: {
    minHeight: 132,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  padCardActive: {
    borderWidth: 4,
    borderColor: '#7C3AED'
  },
  padEmoji: {
    fontSize: 44
  },
  padLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: palette.textPrimary
  },
  pressed: {
    transform: [{ scale: 0.97 }]
  }
});
