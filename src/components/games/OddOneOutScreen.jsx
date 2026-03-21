import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { GameOptionCard } from '../common/GameOptionCard';
import { QuestionCard } from '../common/QuestionCard';
import { Screen } from '../common/Screen';
import { useSettings } from '../../contexts/SettingsContext';
import { palette } from '../../theme/palette';
import { useOddOneOut } from '../../hooks/gameLogic/useOddOneOut';

export function OddOneOutScreen({ navigation }) {
  const { options, score, feedback, shakeId, showConfetti, handleItemClick, speak, optionCount } = useOddOneOut();
  const { questionModes } = useSettings();
  const showImage = questionModes.includes('image');
  const showText = questionModes.includes('text');
  const showSound = questionModes.includes('sound');
  const compactBoard = optionCount >= 4;
  const extraCompactBoard = optionCount >= 6;
  const optionEmojiSize = extraCompactBoard ? 32 : compactBoard ? 40 : showText && !showImage ? 34 : 50;

  return (
    <Screen>
      <GameHeader
        title="Odd One Out"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />
      <View style={styles.tipPill}>
        <Text style={styles.tipText}>Look for the one that does not belong</Text>
      </View>
      <QuestionCard
        text="Which one is different?"
        onSpeak={() => speak('Which one is different', 'question')}
        showText={showText}
        showSound={showSound}
        showImage={showImage}
        visual={showImage ? <Text style={[styles.promptEmoji, compactBoard && styles.promptEmojiCompact]}>🤔</Text> : null}
        soundOnlyLabel="Play clue"
        modeHint={showText ? 'Think and choose' : 'Spot the odd one'}
      />

      <View style={[styles.grid, compactBoard && styles.gridCompact, extraCompactBoard && styles.gridExtraCompact]}>
        {options.map((item) => (
          <GameOptionCard
            key={item._uniqueId}
            item={{ emoji: item.emoji, name: item.label || item.name }}
            highlighted={shakeId === item._uniqueId}
            onPress={() => handleItemClick(item)}
            showEmoji
            showLabel={showText}
            textFirst={showText && !showImage}
            emojiSize={optionEmojiSize}
            compact={compactBoard}
            extraCompact={extraCompactBoard}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  promptEmoji: {
    fontSize: 52
  },
  promptEmojiCompact: {
    fontSize: 44
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
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignContent: 'flex-start',
    justifyContent: 'center'
  },
  gridCompact: {
    gap: 10,
    paddingBottom: 8
  },
  gridExtraCompact: {
    gap: 8
  }
});
