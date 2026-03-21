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
import { useCategoryGame } from '../../hooks/gameLogic/useCategoryGame';

export function CategoryGameScreen({ navigation, title, items, gameId, promptPrefix = 'Find the', renderQuestionVisual, renderOptionVisual }) {
  const { currentItem, shuffledItems, score, feedback, shakeId, showConfetti, handleItemClick, speak } =
    useCategoryGame(items, gameId, title);
  const { questionModes } = useSettings();

  const promptName = currentItem?.label || currentItem?.name || title;
  const showImage = questionModes.includes('image');
  const showText = questionModes.includes('text');
  const showSound = questionModes.includes('sound');
  const answerShowLabel = showText;
  const answerShowEmoji = true;
  const promptModeHint = showImage && showText
    ? 'See, read, and choose'
    : showImage
      ? 'Look and choose'
      : showText
        ? 'Read and choose'
        : 'Listen and choose';
  const tipText = showText
    ? 'Find the matching answer'
    : showSound && !showImage
      ? 'Press play, then tap the match'
      : 'Tap the matching picture';
  const optionCount = shuffledItems.length;
  const compactBoard = optionCount >= 4;
  const extraCompactBoard = optionCount >= 6;
  const answerEmojiSize = extraCompactBoard ? 34 : compactBoard ? 42 : showText && !showImage ? 34 : 54;

  return (
    <Screen>
      <GameHeader
        title={title}
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />
      <View style={styles.tipPill}>
        <Text style={styles.tipText}>{tipText}</Text>
      </View>

      <QuestionCard
        text={`${promptPrefix} ${promptName}`}
        onSpeak={() => speak(`${promptPrefix} ${promptName}`, 'question')}
        showText={showText}
        showSound={showSound}
        showImage={showImage}
        visual={renderQuestionVisual && currentItem ? renderQuestionVisual(currentItem) : <Text style={[styles.promptEmoji, compactBoard && styles.promptEmojiCompact]}>{currentItem?.emoji}</Text>}
        soundOnlyLabel="Listen"
        modeHint={promptModeHint}
      />

      <View style={[styles.grid, compactBoard && styles.gridCompact, extraCompactBoard && styles.gridExtraCompact]}>
        {shuffledItems.map((item) => {
          if (renderOptionVisual) {
            return (
              <View
                key={item.id}
                style={[
                  styles.customOptionCard,
                  compactBoard && styles.customOptionCardCompact,
                  extraCompactBoard && styles.customOptionCardExtraCompact,
                  shakeId === item.id && styles.shakeCard
                ]}
              >
                <GameOptionCard
                  item={{ emoji: '', name: '' }}
                  highlighted={shakeId === item.id}
                  onPress={() => handleItemClick(item)}
                  compact={compactBoard}
                  extraCompact={extraCompactBoard}
                />
                <View pointerEvents="none" style={styles.customOverlay}>
                  {renderOptionVisual(item, {
                    showImage: answerShowEmoji,
                    showLabel: answerShowLabel,
                    textFirst: showText && !showImage,
                    compact: compactBoard,
                    extraCompact: extraCompactBoard
                  })}
                </View>
              </View>
            );
          }

          return (
            <GameOptionCard
              key={item.id}
              item={{ emoji: item.emoji, name: item.label || item.name }}
              highlighted={shakeId === item.id}
              onPress={() => handleItemClick(item)}
              showEmoji={answerShowEmoji}
              showLabel={answerShowLabel}
              textFirst={showText && !showImage}
              emojiSize={answerEmojiSize}
              compact={compactBoard}
              extraCompact={extraCompactBoard}
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  visualWrap: {
    alignSelf: 'center',
    marginBottom: 12
  },
  promptEmoji: {
    fontSize: 58
  },
  promptEmojiCompact: {
    fontSize: 46
  },
  tipPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.86)',
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
  },
  customOptionCard: {
    width: '47%',
    minHeight: 156
  },
  customOptionCardCompact: {
    minHeight: 132
  },
  customOptionCardExtraCompact: {
    width: '31%',
    minHeight: 108
  },
  customOverlay: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  shakeCard: {
    borderRadius: 24,
    borderWidth: 3,
    borderColor: palette.error
  }
});
