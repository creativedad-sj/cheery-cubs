import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { usePatternBuilder } from '../../hooks/gameLogic/usePatternBuilder';
import { palette } from '../../theme/palette';

function PatternPiece({ item, compact, selected, hidden, highlighted, onPress }) {
  if (hidden) {
    return (
      <Pressable onPress={onPress} style={[styles.slotShell, compact && styles.slotShellCompact, highlighted && styles.slotWrong]}>
        <View style={[styles.emptySlot, compact && styles.emptySlotCompact]}>
          <Text style={styles.emptyText}>+</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={[styles.slotShell, compact && styles.slotShellCompact]}>
      <LinearGradient colors={item.colors} style={[styles.pieceCard, compact && styles.pieceCardCompact, selected && styles.pieceSelected]}>
        <Text style={[styles.pieceEmoji, compact && styles.pieceEmojiCompact]}>{item.emoji}</Text>
        <Text style={[styles.pieceLabel, compact && styles.pieceLabelCompact]}>{item.name}</Text>
      </LinearGradient>
    </View>
  );
}

export function PatternBuilderScreen({ navigation }) {
  const {
    title,
    hint,
    ruleItems,
    groupSize,
    slots,
    trayItems,
    selectedItemId,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleTrayPress,
    handleSlotPress,
    speak
  } = usePatternBuilder();
  const { height } = useWindowDimensions();
  const compact = slots.length >= 6 || height < 760;
  const slotGroups = [];

  for (let index = 0; index < slots.length; index += groupSize) {
    slotGroups.push(slots.slice(index, index + groupSize));
  }

  return (
    <Screen>
      <GameHeader
        title="Pattern Train"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.promptCard}>
          <Text style={styles.promptTitle}>{title}</Text>
          <Text style={styles.promptBody}>{`${hint} Use the builder tray to fill the empty spot.`}</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`${title}. ${hint}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>{'\u{1F50A}'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFF7ED', '#FFEDD5']} style={styles.stageCard}>
        <View style={styles.ruleCard}>
          <Text style={styles.ruleTitle}>Repeat this part</Text>
          <View style={[styles.ruleRow, compact && styles.ruleRowCompact]}>
            {ruleItems.map((item, index) => (
              <PatternPiece
                key={`${item.id}-${index}`}
                item={item}
                compact={true}
                hidden={false}
                selected={false}
                highlighted={false}
              />
            ))}
          </View>
        </View>

        <View style={[styles.patternGroupsRow, compact && styles.patternGroupsRowCompact]}>
          {slotGroups.map((group, groupIndex) => (
            <View key={`group-${groupIndex}`} style={styles.patternGroup}>
              <View style={[styles.patternRow, compact && styles.patternRowCompact]}>
                {group.map((slot) => (
                  <PatternPiece
                    key={slot.id}
                    item={slot.item}
                    compact={compact}
                    hidden={slot.hidden}
                    selected={false}
                    highlighted={shakeId === slot.id}
                    onPress={() => handleSlotPress(slot)}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.trayCard}>
          <Text style={styles.trayTitle}>Builder tray</Text>
          <View style={styles.trayRow}>
            {trayItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handleTrayPress(item)}
                style={[styles.trayItemShell, selectedItemId === item.id && styles.trayItemShellSelected]}
              >
                <LinearGradient colors={item.colors} style={styles.trayItemFill}>
                  <Text style={styles.trayEmoji}>{item.emoji}</Text>
                  <Text style={styles.trayLabel}>{item.name}</Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: palette.textPrimary
  },
  promptBody: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: palette.textSecondary,
    marginTop: 4
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
    padding: 12,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  ruleCard: {
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  ruleTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: palette.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 6
  },
  ruleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  ruleRowCompact: {
    gap: 6
  },
  patternGroupsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10
  },
  patternGroupsRowCompact: {
    gap: 6
  },
  patternGroup: {
    backgroundColor: 'rgba(255,255,255,0.58)',
    borderRadius: 22,
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  patternRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 0
  },
  patternRowCompact: {
    gap: 5
  },
  slotShell: {
    width: 68,
    minHeight: 76
  },
  slotShellCompact: {
    width: 58,
    minHeight: 66
  },
  pieceCard: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 8
  },
  pieceCardCompact: {
    borderRadius: 16,
    paddingVertical: 6
  },
  pieceSelected: {
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },
  pieceEmoji: {
    fontSize: 24
  },
  pieceEmojiCompact: {
    fontSize: 20
  },
  pieceLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  pieceLabelCompact: {
    fontSize: 9
  },
  emptySlot: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#FB923C',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptySlotCompact: {
    borderRadius: 16
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#F97316'
  },
  slotWrong: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: palette.error
  },
  trayCard: {
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 26,
    padding: 10
  },
  trayTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 8
  },
  trayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  trayItemShell: {
    flex: 1,
    maxWidth: 96,
    borderRadius: 20,
    overflow: 'hidden'
  },
  trayItemShellSelected: {
    transform: [{ translateY: -4 }],
    borderWidth: 3,
    borderColor: palette.accent
  },
  trayItemFill: {
    minHeight: 74,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  trayEmoji: {
    fontSize: 24
  },
  trayLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center'
  }
});
