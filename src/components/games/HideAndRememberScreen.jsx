import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useHideAndRemember } from '../../hooks/gameLogic/useHideAndRemember';
import { palette } from '../../theme/palette';

function SpotCard({ icon, reveal, friendEmoji, onPress, disabled }) {
  const content = (
    <LinearGradient colors={['#FFFFFF', '#FEF3C7']} style={styles.spotCard}>
      <Text style={styles.spotEmoji}>{reveal ? friendEmoji : icon}</Text>
    </LinearGradient>
  );

  if (disabled) {
    return <View style={styles.spotWrap}>{content}</View>;
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.spotWrap, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

export function HideAndRememberScreen({ navigation }) {
  const { round, previewPhase, score, feedback, showConfetti, handleSpotPress } = useHideAndRemember();

  return (
    <Screen>
      <GameHeader
        title="Hide & Remember"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptCard}>
        <Text style={styles.promptEyebrow}>Memory hiding game</Text>
        <Text style={styles.promptTitle}>{previewPhase ? `Remember the ${round.friend.name}` : `Where is the ${round.friend.name}?`}</Text>
        <Text style={styles.promptBody}>
          {previewPhase ? 'Watch where your little friend is hiding.' : 'Tap the hiding place you remember.'}
        </Text>
      </View>

      <LinearGradient colors={['#FFF7ED', '#FEF3C7']} style={styles.stageCard}>
        <View style={styles.friendBadge}>
          <Text style={styles.friendEmoji}>{round.friend.emoji}</Text>
          <Text style={styles.friendText}>{previewPhase ? 'Watch closely' : 'Tap the right hiding spot'}</Text>
        </View>

        <View style={styles.spotsRow}>
          {round.spots.map((spot, index) => (
            <SpotCard
              key={`${spot}-${index}`}
              icon={spot}
              reveal={previewPhase && index === round.targetIndex}
              friendEmoji={round.friend.emoji}
              disabled={previewPhase}
              onPress={() => handleSpotPress(index)}
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
  friendBadge: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 14
  },
  friendEmoji: {
    fontSize: 30
  },
  friendText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  spotsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  spotWrap: {
    flex: 1
  },
  spotCard: {
    minHeight: 156,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spotEmoji: {
    fontSize: 56
  },
  pressed: {
    transform: [{ scale: 0.97 }]
  }
});
