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
    themeName,
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
          <Text style={styles.promptEyebrow}>{themeName} set</Text>
          <Text style={styles.promptTitle}>{title}</Text>
          <Text style={styles.promptBody}>{hint}</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`${title}. ${hint}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFF7ED', '#FFEDD5']} style={styles.stageCard}>
        <View style={styles.stageBanner}>
          <Text style={styles.stageBannerText}>Look at the little group first. That same group keeps repeating.</Text>
        </View>

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
  stageBanner: {
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12
  },
  stageBannerText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: palette.textSecondary,
    textAlign: 'center'
  },
  ruleCard: {
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  ruleTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 8
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
    gap: 10,
    marginBottom: 14
  },
  patternGroupsRowCompact: {
    gap: 8
  },
  patternGroup: {
    backgroundColor: 'rgba(255,255,255,0.58)',
    borderRadius: 24,
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  patternRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 0
  },
  patternRowCompact: {
    gap: 6
  },
  slotShell: {
    width: 74,
    minHeight: 84
  },
  slotShellCompact: {
    width: 64,
    minHeight: 74
  },
  pieceCard: {
    flex: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  pieceCardCompact: {
    borderRadius: 18,
    paddingVertical: 8
  },
  pieceSelected: {
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },
  pieceEmoji: {
    fontSize: 28
  },
  pieceEmojiCompact: {
    fontSize: 24
  },
  pieceLabel: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  pieceLabelCompact: {
    fontSize: 10
  },
  emptySlot: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#FB923C',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptySlotCompact: {
    borderRadius: 18
  },
  emptyText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F97316'
  },
  slotWrong: {
    borderRadius: 22,
    borderWidth: 3,
    borderColor: palette.error
  },
  trayCard: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 26,
    padding: 12
  },
  trayTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  trayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  },
  trayItemShell: {
    flex: 1,
    maxWidth: 104,
    borderRadius: 22,
    overflow: 'hidden'
  },
  trayItemShellSelected: {
    transform: [{ translateY: -4 }],
    borderWidth: 3,
    borderColor: palette.accent
  },
  trayItemFill: {
    minHeight: 86,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  trayEmoji: {
    fontSize: 28
  },
  trayLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center'
  }
});
