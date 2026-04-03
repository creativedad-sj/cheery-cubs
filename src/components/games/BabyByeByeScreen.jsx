import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BabyGameShell } from '../common/BabyGameShell';
import { useBabyByeBye } from '../../hooks/gameLogic/useBabyByeBye';
import { palette } from '../../theme/palette';

export function BabyByeByeScreen({ navigation }) {
  const { friend, waveCount, handleWave, speak } = useBabyByeBye();

  return (
    <BabyGameShell
      title="Wave Bye-Bye"
      navigation={navigation}
      eyebrow="CDC-inspired co-play"
      promptTitle="Practice waving"
      promptBody="Tap the friend and say “bye-bye” together while your baby watches or waves."
      onSpeak={() => speak('Bye-bye!', 'question')}
      stageColors={['#EFF6FF', '#DBEAFE']}
      footerTip="Pause after each wave so your baby has time to imitate the movement or sound."
    >
      <View style={styles.stageCenter}>
        <Text style={styles.counterText}>Waves today: {waveCount}</Text>
        <Pressable onPress={handleWave} style={({ pressed }) => [styles.friendWrap, pressed && styles.friendWrapPressed]}>
          <LinearGradient colors={['#FFFFFF', '#BFDBFE']} style={styles.friendCard}>
            <Text style={styles.friendEmoji}>{friend.emoji}</Text>
            <Text style={styles.friendLabel}>Bye-bye, {friend.name}!</Text>
            <Text style={styles.friendHint}>Tap to wave hello, then goodbye</Text>
            <Text style={styles.waveHand}>👋</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </BabyGameShell>
  );
}

const styles = StyleSheet.create({
  stageCenter: {
    flex: 1
  },
  counterText: {
    alignSelf: 'center',
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '800',
    color: palette.textSecondary
  },
  friendWrap: {
    flex: 1
  },
  friendWrapPressed: {
    transform: [{ scale: 0.98 }]
  },
  friendCard: {
    flex: 1,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  friendEmoji: {
    fontSize: 92,
    marginBottom: 10
  },
  friendLabel: {
    fontSize: 28,
    fontWeight: '900',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  friendHint: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: palette.textSecondary,
    textAlign: 'center'
  },
  waveHand: {
    marginTop: 12,
    fontSize: 42
  }
});
