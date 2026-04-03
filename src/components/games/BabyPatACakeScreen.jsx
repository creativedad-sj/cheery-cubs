import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BabyGameShell } from '../common/BabyGameShell';
import { useBabyPatACake } from '../../hooks/gameLogic/useBabyPatACake';
import { palette } from '../../theme/palette';

export function BabyPatACakeScreen({ navigation }) {
  const { step, sparkleCount, handleTap, speak } = useBabyPatACake();

  return (
    <BabyGameShell
      title="Pat-a-Cake"
      navigation={navigation}
      eyebrow="CDC-inspired co-play"
      promptTitle="Clap and sing together"
      promptBody="Tap the big hands while you say the rhyme out loud with your baby."
      onSpeak={() => speak('Pat-a-cake, pat-a-cake, baker’s man.', 'question')}
      stageColors={['#FFF7ED', '#FFEDD5']}
      footerTip="Keep the rhythm slow and playful so your baby can watch, clap, or reach toward your hands."
    >
      <View style={styles.stageCenter}>
        <View style={styles.stepCard}>
          <Text style={styles.stepTitle}>{step.label}</Text>
          <Text style={styles.stepHelper}>{step.helper}</Text>
        </View>

        <Pressable onPress={handleTap} style={({ pressed }) => [styles.tapWrap, pressed && styles.tapWrapPressed]}>
          <LinearGradient colors={['#FFFFFF', '#FED7AA']} style={styles.tapCard}>
            <Text style={styles.tapHands}>👏</Text>
            <Text style={styles.tapText}>Tap to clap</Text>
            <Text style={styles.sparkleText}>{'✨'.repeat((sparkleCount % 3) + 1)}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </BabyGameShell>
  );
}

const styles = StyleSheet.create({
  stageCenter: {
    flex: 1,
    gap: 12
  },
  stepCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    alignItems: 'center'
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  stepHelper: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: palette.textSecondary,
    textAlign: 'center'
  },
  tapWrap: {
    flex: 1
  },
  tapWrapPressed: {
    transform: [{ scale: 0.98 }]
  },
  tapCard: {
    flex: 1,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  tapHands: {
    fontSize: 104,
    marginBottom: 10
  },
  tapText: {
    fontSize: 24,
    fontWeight: '900',
    color: palette.textPrimary
  },
  sparkleText: {
    marginTop: 10,
    fontSize: 28
  }
});
