import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BabyGameShell } from '../common/BabyGameShell';
import { useBabyPutInTakeOut } from '../../hooks/gameLogic/useBabyPutInTakeOut';
import { palette } from '../../theme/palette';

export function BabyPutInTakeOutScreen({ navigation }) {
  const { items, basketCount, allInBasket, handleToyPress, resetBasket, speak } = useBabyPutInTakeOut();

  return (
    <BabyGameShell
      title="Put In, Take Out"
      navigation={navigation}
      eyebrow="CDC-inspired co-play"
      promptTitle="Fill the basket together"
      promptBody="Tap toys to put them in the basket, then take them back out and do it again."
      onSpeak={() => speak('Put the toy in the basket.', 'question')}
      stageColors={['#FEFCE8', '#FEF3C7']}
      footerTip="Let your baby watch each toy go in, then point and name it as you take it out again."
    >
      <View style={styles.stageCenter}>
        <View style={styles.basketCard}>
          <Text style={styles.basketEmoji}>🧺</Text>
          <Text style={styles.basketText}>{basketCount} in the basket</Text>
        </View>

        <View style={styles.toyRow}>
          {items.map((item) => (
            <Pressable key={item.id} onPress={() => handleToyPress(item.id)} style={({ pressed }) => [styles.toyWrap, pressed && styles.toyWrapPressed]}>
              <LinearGradient colors={item.inBasket ? ['#BBF7D0', '#86EFAC'] : ['#FFFFFF', '#FDE68A']} style={styles.toyCard}>
                <Text style={styles.toyEmoji}>{item.emoji}</Text>
                <Text style={styles.toyLabel}>{item.inBasket ? 'In' : 'Tap'}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        {allInBasket ? (
          <Pressable onPress={resetBasket} style={styles.resetWrap}>
            <LinearGradient colors={['#F97316', '#FB7185']} style={styles.resetCard}>
              <Text style={styles.resetText}>Take them out</Text>
            </LinearGradient>
          </Pressable>
        ) : null}
      </View>
    </BabyGameShell>
  );
}

const styles = StyleSheet.create({
  stageCenter: {
    flex: 1
  },
  basketCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12
  },
  basketEmoji: {
    fontSize: 48
  },
  basketText: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '900',
    color: palette.textPrimary
  },
  toyRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },
  toyWrap: {
    width: '47%',
    aspectRatio: 1
  },
  toyWrapPressed: {
    transform: [{ scale: 0.98 }]
  },
  toyCard: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toyEmoji: {
    fontSize: 48
  },
  toyLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: palette.textPrimary
  },
  resetWrap: {
    marginTop: 12
  },
  resetCard: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center'
  },
  resetText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF'
  }
});
