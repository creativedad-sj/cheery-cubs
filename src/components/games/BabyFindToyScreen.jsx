import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BabyGameShell } from '../common/BabyGameShell';
import { useBabyFindToy } from '../../hooks/gameLogic/useBabyFindToy';
import { palette } from '../../theme/palette';

function BlanketCard({ blanket, toy, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.blanketWrap, pressed && styles.blanketWrapPressed]}>
      <LinearGradient colors={['#FFFFFF', '#E9D5FF']} style={styles.blanketCard}>
        <Text style={styles.blanketEmoji}>{blanket.revealed ? (blanket.hasToy ? toy.emoji : '🫣') : '🧺'}</Text>
        <Text style={styles.blanketLabel}>
          {blanket.revealed ? (blanket.hasToy ? toy.name : 'Not here') : 'Tap to look'}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

export function BabyFindToyScreen({ navigation }) {
  const { toy, blankets, handleBlanketPress, speak } = useBabyFindToy();

  return (
    <BabyGameShell
      title="Find the Toy"
      navigation={navigation}
      eyebrow="CDC-inspired co-play"
      promptTitle={`Where is the ${toy.name.toLowerCase()}?`}
      promptBody="Tap a basket together and see if the hidden toy is underneath."
      onSpeak={() => speak(`Where is the ${toy.name}?`, 'question')}
      stageColors={['#F5F3FF', '#EDE9FE']}
      footerTip="Point to one basket and ask your baby to look for the toy before you tap."
    >
      <View style={styles.stageCenter}>
        <View style={styles.toyPromptCard}>
          <Text style={styles.toyPromptEmoji}>{toy.emoji}</Text>
          <Text style={styles.toyPromptText}>Find the {toy.name.toLowerCase()}</Text>
        </View>
        <View style={styles.blanketRow}>
          {blankets.map((blanket, index) => (
            <BlanketCard key={blanket.id} blanket={blanket} toy={toy} onPress={() => handleBlanketPress(index)} />
          ))}
        </View>
      </View>
    </BabyGameShell>
  );
}

const styles = StyleSheet.create({
  stageCenter: {
    flex: 1,
    gap: 14
  },
  toyPromptCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center'
  },
  toyPromptEmoji: {
    fontSize: 54
  },
  toyPromptText: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '900',
    color: palette.textPrimary
  },
  blanketRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 10
  },
  blanketWrap: {
    flex: 1
  },
  blanketWrapPressed: {
    transform: [{ scale: 0.98 }]
  },
  blanketCard: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  blanketEmoji: {
    fontSize: 54
  },
  blanketLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: palette.textPrimary,
    textAlign: 'center'
  }
});
