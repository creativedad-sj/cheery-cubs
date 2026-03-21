import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { palette } from '../../theme/palette';
import { useMemory } from '../../hooks/gameLogic/useMemory';

export function MemoryGameScreen({ navigation }) {
  const { cards, moves, matchedPairs, totalPairs, showConfetti, feedback, handleCardClick, previewPhase } = useMemory();

  return (
    <Screen scroll>
      <GameHeader
        title="Memory"
        score={matchedPairs}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.tipPill}>
        <Text style={styles.tipText}>{previewPhase ? 'Look closely and remember the cards' : 'Tap two cards to make a match'}</Text>
      </View>

      <View style={styles.statsBar}>
        <Text style={styles.statsText}>Moves: {moves}</Text>
        <Text style={styles.statsText}>Pairs: {matchedPairs}/{totalPairs}</Text>
      </View>

      <View style={styles.grid}>
        {cards.map((card, index) => (
          <Pressable
            key={card.id}
            onPress={() => handleCardClick(index)}
            style={({ pressed }) => [
              styles.card,
              (card.faceUp || card.matched) && styles.faceUpCard,
              card.matched && styles.matchedCard,
              previewPhase && styles.previewCard,
              pressed && styles.pressed
            ]}
          >
            <Text style={[styles.cardText, card.faceUp || card.matched ? styles.cardTextVisible : styles.cardTextHidden]}>
              {card.faceUp || card.matched ? card.emoji : '❓'}
            </Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tipPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 10
  },
  tipText: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.textSecondary
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderRadius: 24,
    paddingVertical: 14,
    marginBottom: 18
  },
  statsText: {
    fontSize: 16,
    fontWeight: '800',
    color: palette.textSecondary
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center'
  },
  card: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: palette.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  faceUpCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FCA5A5'
  },
  matchedCard: {
    backgroundColor: '#DCFCE7',
    borderColor: '#4ADE80'
  },
  previewCard: {
    borderWidth: 3,
    borderColor: palette.accent
  },
  cardText: {
    fontSize: 34
  },
  cardTextVisible: {
    color: palette.textPrimary
  },
  cardTextHidden: {
    color: '#FFFFFF'
  },
  pressed: {
    transform: [{ scale: 0.96 }]
  }
});
