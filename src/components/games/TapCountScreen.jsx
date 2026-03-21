import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { QuestionCard } from '../common/QuestionCard';
import { Screen } from '../common/Screen';
import { useSettings } from '../../contexts/SettingsContext';
import { palette } from '../../theme/palette';
import { useTapCount } from '../../hooks/gameLogic/useTapCount';

export function TapCountScreen({ navigation }) {
  const { items, targetCount, tappedCount, score, feedback, showConfetti, handleTap, speak } = useTapCount();
  const { questionModes } = useSettings();
  const showImage = questionModes.includes('image');
  const showText = questionModes.includes('text');
  const showSound = questionModes.includes('sound');
  const promptEmoji = items[0]?.emoji || '⭐';
  const promptModeHint = showImage && showText
    ? 'See, count, and tap'
    : showImage
      ? 'Count the pictures'
      : showText
        ? 'Read and tap'
        : 'Listen and tap';

  return (
    <Screen>
      <GameHeader
        title="Tap Count"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />
      <View style={styles.tipPill}>
        <Text style={styles.tipText}>Tap every picture one time</Text>
      </View>
      <QuestionCard
        text={`Tap each one! ${tappedCount} of ${targetCount}`}
        onSpeak={() => speak(`Count ${targetCount}`, 'question')}
        showText={showText}
        showSound={showSound}
        showImage={showImage}
        visual={showImage ? <Text style={styles.promptEmoji}>{promptEmoji}</Text> : null}
        soundOnlyLabel="Play clue"
        modeHint={promptModeHint}
      />

      <View style={styles.grid}>
        {items.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => handleTap(index)}
            style={({ pressed }) => [styles.card, item.tapped && styles.cardTapped, pressed && styles.pressed]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            {item.tapped ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.order}</Text>
              </View>
            ) : null}
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    alignContent: 'flex-start',
    justifyContent: 'center'
  },
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
  promptEmoji: {
    fontSize: 52
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  cardTapped: {
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#4ADE80'
  },
  emoji: {
    fontSize: 46
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '800'
  },
  pressed: {
    transform: [{ scale: 0.95 }]
  }
});
