import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useFindWhatChanged } from '../../hooks/gameLogic/useFindWhatChanged';
import { palette } from '../../theme/palette';

function PictureCard({ item, onPress, disabled }) {
  const content = (
    <LinearGradient colors={['#FFFFFF', '#E0F2FE']} style={styles.pictureCard}>
      <Text style={styles.pictureEmoji}>{item.emoji}</Text>
      <Text style={styles.pictureLabel}>{item.name}</Text>
    </LinearGradient>
  );

  if (disabled) {
    return <View style={styles.pictureWrap}>{content}</View>;
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pictureWrap, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

export function FindWhatChangedScreen({ navigation }) {
  const { round, score, feedback, showConfetti, previewPhase, handleChoice, speak } = useFindWhatChanged();
  const items = previewPhase ? round.original : round.changed;

  return (
    <Screen>
      <GameHeader
        title="Find What Changed"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#E0F2FE']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Memory challenge</Text>
          <Text style={styles.promptTitle}>{previewPhase ? 'Look carefully' : 'What changed?'}</Text>
          <Text style={styles.promptBody}>
            {previewPhase
              ? 'Remember these pictures before one changes.'
              : 'Tap the picture spot that changed.'}
          </Text>
        </LinearGradient>

        <Pressable
          onPress={() => speak(previewPhase ? 'Look carefully before one picture changes.' : 'Tap the spot that changed.', 'question')}
          style={styles.soundButton}
        >
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>{'\u{1F50A}'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#E0F2FE', '#DBEAFE']} style={styles.stageCard}>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{previewPhase ? 'Remember the pictures' : 'Tap the changed spot'}</Text>
        </View>

        <View style={styles.grid}>
          {items.map((item, index) => (
            <PictureCard
              key={`${item.id}-${index}`}
              item={item}
              disabled={previewPhase}
              onPress={() => handleChoice(index)}
            />
          ))}
        </View>
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  promptRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    marginBottom: 12
  },
  promptCard: {
    flex: 1,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  promptEyebrow: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 6
  },
  promptTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: palette.textPrimary,
    marginBottom: 4
  },
  promptBody: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: palette.textSecondary
  },
  soundButton: {
    width: 64,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  soundFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  soundEmoji: {
    fontSize: 28
  },
  stageCard: {
    flex: 1,
    borderRadius: 32,
    padding: 14,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  statusPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 12
  },
  statusText: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12
  },
  pictureWrap: {
    width: '46%'
  },
  pictureCard: {
    minHeight: 122,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8
  },
  pictureEmoji: {
    fontSize: 48
  },
  pictureLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: palette.textPrimary,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  pressed: {
    transform: [{ scale: 0.97 }]
  }
});
