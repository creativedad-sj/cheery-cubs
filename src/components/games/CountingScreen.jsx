import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { QuestionCard } from '../common/QuestionCard';
import { CelebrationCard } from '../common/CelebrationCard';
import { useSettings } from '../../contexts/SettingsContext';
import { palette } from '../../theme/palette';
import { useCounting } from '../../hooks/gameLogic/useCounting';

export function CountingScreen({ navigation }) {
  const { count, object, score, feedback, shakeId, showConfetti, handleNumberClick, speak, maxCount } = useCounting();
  const { questionModes } = useSettings();
  const numbers = Array.from({ length: maxCount }, (_, index) => index + 1);
  const showImage = questionModes.includes('image');
  const showText = questionModes.includes('text');
  const showSound = questionModes.includes('sound');
  const promptModeHint = showImage && showText ? 'Count, then choose the number' : showImage ? 'Count the pictures' : showText ? 'Read and choose the number' : 'Listen and count';
  const compactRound = count >= 10 || maxCount >= 15;
  const extraCompactRound = count >= 13;

  return (
    <Screen>
      <GameHeader
        title="Counting"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />
      <View style={styles.tipPill}>
        <Text style={styles.tipText}>{showText ? 'Count carefully, then choose the right number' : 'Count the pictures, then tap the number'}</Text>
      </View>
      <QuestionCard
        text={`How many ${object.name}?`}
        onSpeak={() => speak(`How many ${object.name}?`, 'question')}
        showText={showText}
        showSound={showSound}
        showImage={showImage}
        visual={showImage ? <Text style={[styles.questionEmoji, compactRound && styles.questionEmojiCompact]}>{object.emoji}</Text> : null}
        soundOnlyLabel="Play clue"
        modeHint={promptModeHint}
      />

      <View style={[styles.objectsPanel, compactRound && styles.objectsPanelCompact, extraCompactRound && styles.objectsPanelExtraCompact]}>
        {Array.from({ length: count }).map((_, index) => (
          <View key={`${object.name}-${index}`} style={[styles.objectCard, compactRound && styles.objectCardCompact, extraCompactRound && styles.objectCardExtraCompact]}>
            <Text style={[styles.objectEmoji, compactRound && styles.objectEmojiCompact, extraCompactRound && styles.objectEmojiExtraCompact]}>{object.emoji}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.numbersGrid, compactRound && styles.numbersGridCompact]}>
        {numbers.map((number) => (
          <Pressable
            key={number}
            onPress={() => handleNumberClick(number)}
            style={({ pressed }) => [
              styles.numberCard,
              compactRound && styles.numberCardCompact,
              extraCompactRound && styles.numberCardExtraCompact,
              shakeId === number && styles.shakeCard,
              pressed && styles.pressed
            ]}
          >
            <Text style={[styles.numberText, compactRound && styles.numberTextCompact, extraCompactRound && styles.numberTextExtraCompact]}>{number}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  objectsPanel: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 26,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 12
  },
  objectsPanelCompact: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 10
  },
  objectsPanelExtraCompact: {
    gap: 7
  },
  questionEmoji: {
    fontSize: 46
  },
  questionEmojiCompact: {
    fontSize: 40
  },
  objectCard: {
    width: 66,
    height: 66,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  objectCardCompact: {
    width: 56,
    height: 56,
    borderRadius: 18
  },
  objectCardExtraCompact: {
    width: 50,
    height: 50,
    borderRadius: 16
  },
  objectEmoji: {
    fontSize: 34
  },
  objectEmojiCompact: {
    fontSize: 30
  },
  objectEmojiExtraCompact: {
    fontSize: 27
  },
  tipPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 8
  },
  tipText: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.textSecondary
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center'
  },
  numbersGridCompact: {
    gap: 8
  },
  numberCard: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2
  },
  numberCardCompact: {
    width: 54,
    height: 54,
    borderRadius: 16
  },
  numberCardExtraCompact: {
    width: 50,
    height: 50,
    borderRadius: 15
  },
  shakeCard: {
    borderWidth: 3,
    borderColor: palette.error
  },
  pressed: {
    transform: [{ scale: 0.95 }]
  },
  numberText: {
    fontSize: 24,
    fontWeight: '800',
    color: palette.textPrimary
  },
  numberTextCompact: {
    fontSize: 22
  },
  numberTextExtraCompact: {
    fontSize: 20
  }
});
