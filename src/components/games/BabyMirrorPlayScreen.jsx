import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BabyGameShell } from '../common/BabyGameShell';
import { useBabyMirrorPlay } from '../../hooks/gameLogic/useBabyMirrorPlay';
import { palette } from '../../theme/palette';

export function BabyMirrorPlayScreen({ navigation }) {
  const { face, nextFace, speak } = useBabyMirrorPlay();

  return (
    <BabyGameShell
      title="Mirror Play"
      navigation={navigation}
      eyebrow="CDC-inspired co-play"
      promptTitle="Copy the face together"
      promptBody="Tap the mirror to change the face, then make the same face with your baby."
      onSpeak={() => speak('Look in the mirror together.', 'question')}
      stageColors={['#EEF2FF', '#DDD6FE']}
      footerTip="Hold your own face close, copy the expression slowly, and give your baby time to watch or imitate."
    >
      <View style={styles.stageCenter}>
        <Pressable onPress={nextFace} style={({ pressed }) => [styles.mirrorWrap, pressed && styles.mirrorWrapPressed]}>
          <LinearGradient colors={['#FFFFFF', '#EDE9FE']} style={styles.mirrorCard}>
            <Text style={styles.faceEmoji}>{face.emoji}</Text>
            <Text style={styles.faceTitle}>{face.title} face</Text>
            <Text style={styles.faceHelper}>{face.helper}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </BabyGameShell>
  );
}

const styles = StyleSheet.create({
  stageCenter: {
    flex: 1,
    justifyContent: 'center'
  },
  mirrorWrap: {
    flex: 1
  },
  mirrorWrapPressed: {
    transform: [{ scale: 0.98 }]
  },
  mirrorCard: {
    flex: 1,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  faceEmoji: {
    fontSize: 108,
    marginBottom: 12
  },
  faceTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  faceHelper: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: palette.textSecondary,
    textAlign: 'center'
  }
});
