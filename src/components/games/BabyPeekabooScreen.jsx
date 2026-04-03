import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BabyGameShell } from '../common/BabyGameShell';
import { useBabyPeekaboo } from '../../hooks/gameLogic/useBabyPeekaboo';
import { palette } from '../../theme/palette';

export function BabyPeekabooScreen({ navigation }) {
  const { friend, isHidden, handlePeek, speak } = useBabyPeekaboo();

  return (
    <BabyGameShell
      title="Peekaboo"
      navigation={navigation}
      eyebrow="CDC-inspired co-play"
      promptTitle="Peekaboo together"
      promptBody="Tap the blanket to hide and reveal a friendly face with your baby."
      onSpeak={() => speak('Peekaboo! Where did the friend go?', 'question')}
      stageColors={['#FDF2F8', '#FCE7F3']}
      footerTip="Try saying “peekaboo!” before you tap, then wait for your baby to look back at the reveal."
    >
      <View style={styles.stageCenter}>
        <Pressable onPress={handlePeek} style={({ pressed }) => [styles.friendWrap, pressed && styles.friendWrapPressed]}>
          <LinearGradient colors={['#FFFFFF', '#FBCFE8']} style={styles.friendCard}>
            <Text style={styles.friendEmoji}>{isHidden ? '🫣' : friend.emoji}</Text>
            <Text style={styles.friendLabel}>{isHidden ? 'Where is your friend?' : `Hi, ${friend.name}!`}</Text>
            <Text style={styles.friendHint}>{isHidden ? 'Tap to peek' : 'Tap to hide and choose a new friend'}</Text>
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
    fontSize: 104,
    marginBottom: 12
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
  }
});
