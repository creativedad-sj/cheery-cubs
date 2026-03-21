import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { GameOptionCard } from '../common/GameOptionCard';
import { QuestionCard } from '../common/QuestionCard';
import { Screen } from '../common/Screen';
import { useSettings } from '../../contexts/SettingsContext';
import { useColorMatch } from '../../hooks/gameLogic/useColorMatch';
import { colorEmojis } from '../../utils/constants';

export function ColorMatchScreen({ navigation }) {
  const { targetColor, options, score, feedback, shakeId, showConfetti, handleItemClick, speak, optionCount } = useColorMatch();
  const { questionModes } = useSettings();
  const showImage = questionModes.includes('image');
  const showText = questionModes.includes('text');
  const showSound = questionModes.includes('sound');
  const promptModeHint = showImage && showText ? 'See the color and read the word' : showImage ? 'See the color' : showText ? 'Read the color word' : 'Listen for the color';
  const compactBoard = optionCount >= 4;
  const extraCompactBoard = optionCount >= 6;
  const optionEmojiSize = extraCompactBoard ? 32 : compactBoard ? 40 : showText && !showImage ? 34 : 50;

  return (
    <Screen>
      <GameHeader
        title="Colors"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <QuestionCard
        text={`Find something ${targetColor || ''}`}
        onSpeak={() => speak(`Find something ${targetColor || ''}`, 'question')}
        showText={showText}
        showSound={showSound}
        showImage={showImage}
        visual={
          targetColor ? (
            <View style={[styles.colorPrompt, compactBoard && styles.colorPromptCompact]}>
              <View style={[styles.colorSwatch, compactBoard && styles.colorSwatchCompact]}>
                <Text style={styles.colorPromptEmoji}>{colorEmojis[targetColor]}</Text>
              </View>
              {showText && !showImage ? <Text style={styles.colorPromptLabel}>{targetColor}</Text> : null}
            </View>
          ) : null
        }
        soundOnlyLabel="Play color"
        modeHint={promptModeHint}
      />

      <View style={[styles.grid, compactBoard && styles.gridCompact, extraCompactBoard && styles.gridExtraCompact]}>
        {options.map((item) => (
          <GameOptionCard
            key={item.id}
            item={item}
            highlighted={shakeId === item.id}
            onPress={() => handleItemClick(item)}
            showEmoji={true}
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
  colorPrompt: {
    alignSelf: 'center',
    alignItems: 'center',
    gap: 8
  },
  colorPromptCompact: {
    gap: 6
  },
  colorSwatch: {
    width: 92,
    height: 92,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorSwatchCompact: {
    width: 76,
    height: 76,
    borderRadius: 24
  },
  colorPromptEmoji: {
    fontSize: 50
  },
  colorPromptLabel: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: '800',
    color: '#2C3E50'
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
