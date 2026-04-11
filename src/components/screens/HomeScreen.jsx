import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../common/Screen';
import { useSettings } from '../../contexts/SettingsContext';
import {
  childStages,
  childStagesById,
  getFeaturedGamesForStage,
  getGamesForStageAndSkill,
  skillAreasById
} from '../../utils/constants';
import { palette } from '../../theme/palette';

function HeaderButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.roundButton}>
      <Text style={styles.roundButtonText}>{label}</Text>
    </Pressable>
  );
}

function GameCard({ game, caption, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.gameWrap, pressed && styles.pressed]}>
      <LinearGradient colors={game.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gameCard}>
        <View style={styles.gameTop}>
          <Text style={styles.gameIcon}>{game.icon}</Text>
          <Text style={styles.gameTitle}>{game.title}</Text>
        </View>
        <View style={styles.gameBottom}>
          <Text style={styles.gameCaption}>{caption || game.learningGoal}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function StageCard({ stage, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.stageCard, selected && styles.stageCardActive, pressed && styles.pressed]}>
      <View style={styles.stageTopRow}>
        <View>
          <Text style={styles.stageTitle}>{stage.title}</Text>
          <Text style={styles.stageAge}>{stage.ageLabel}</Text>
        </View>
        {selected ? <Text style={styles.stageSelected}>Selected</Text> : null}
      </View>
      <Text style={styles.stageBody}>{stage.description}</Text>
      <View style={styles.stagePills}>
        {stage.featuredSkills.map((skillId) => (
          <View key={skillId} style={styles.stagePill}>
            <Text style={styles.stagePillText}>{skillAreasById[skillId]?.title || skillId}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export function HomeScreen({ navigation }) {
  const { childStageId, setChildStageId } = useSettings();
  const selectedStage = childStagesById[childStageId] || null;
  const [activeSkillId, setActiveSkillId] = React.useState(selectedStage?.featuredSkills?.[0] || '');

  React.useEffect(() => {
    if (!selectedStage) {
      setActiveSkillId('');
      return;
    }

    if (!selectedStage.featuredSkills.includes(activeSkillId)) {
      setActiveSkillId(selectedStage.featuredSkills[0]);
    }
  }, [activeSkillId, selectedStage]);

  const featuredGames = selectedStage ? getFeaturedGamesForStage(selectedStage.id) : [];
  const activeSkill = activeSkillId ? skillAreasById[activeSkillId] : null;
  const activeGames = selectedStage && activeSkillId ? getGamesForStageAndSkill(selectedStage.id, activeSkillId) : [];

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>Cheery Cubs</Text>
        <View style={styles.headerActions}>
          <HeaderButton label={'\u{1F3C6}'} onPress={() => navigation.navigate('StickerBook')} />
          <HeaderButton label={'\u{1F4CA}'} onPress={() => navigation.navigate('Dashboard')} />
          <HeaderButton label={'\u2699\uFE0F'} onPress={() => navigation.navigate('Settings')} />
        </View>
      </View>

      <LinearGradient colors={['#FFEDD5', '#FFFFFF']} style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Made for parents</Text>
        </View>
        <Text style={styles.brand}>Find the right game for your child in just a few taps.</Text>
        <Text style={styles.subheading}>
          Choose an age range, pick a learning area, and start with the core games that best fit your child&apos;s stage.
        </Text>
        <Pressable onPress={() => navigation.navigate('AllGames')} style={styles.browseButton}>
          <Text style={styles.browseButtonText}>Browse all games</Text>
        </Pressable>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Choose an age range</Text>
        <Text style={styles.sectionHint}>Pick the stage that feels right today. You can change it any time.</Text>
        <View style={styles.stageGrid}>
          {childStages.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              selected={childStageId === stage.id}
              onPress={() => setChildStageId(stage.id)}
            />
          ))}
        </View>
      </View>

      {selectedStage ? (
        <>
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <View>
                <Text style={styles.sectionLabel}>Recommended to start</Text>
                <Text style={styles.sectionHint}>A few strong core picks for {selectedStage.title.toLowerCase()}.</Text>
              </View>
              <View style={styles.stageSummaryPill}>
                <Text style={styles.stageSummaryText}>{selectedStage.ageLabel}</Text>
              </View>
            </View>
            <View style={styles.grid}>
              {featuredGames.map((game) => (
                <GameCard
                  key={game.route}
                  game={game}
                  caption={game.learningGoal}
                  onPress={() => navigation.navigate(game.route)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Choose a learning area</Text>
            <Text style={styles.sectionHint}>Pick what you&apos;d like your child to practice today. These are the core games we recommend first.</Text>
            <View style={styles.skillChipRow}>
              {selectedStage.featuredSkills.map((skillId) => {
                const skill = skillAreasById[skillId];
                const selected = activeSkillId === skillId;

                return (
                  <Pressable
                    key={skillId}
                    onPress={() => setActiveSkillId(skillId)}
                    style={[styles.skillChip, selected && styles.skillChipActive]}
                  >
                    <Text style={styles.skillChipIcon}>{skill.icon}</Text>
                    <Text style={[styles.skillChipText, selected && styles.skillChipTextActive]}>{skill.title}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {activeSkill ? (
            <LinearGradient colors={activeSkill.colors} style={styles.skillHeroCard}>
              <Text style={styles.skillHeroTitle}>{activeSkill.title}</Text>
              <Text style={styles.skillHeroBody}>{activeSkill.description}</Text>
            </LinearGradient>
          ) : null}

          {activeGames.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Games in this learning area</Text>
              <Text style={styles.sectionHint}>Browse all games if you want extra activities beyond these core picks.</Text>
              <View style={styles.grid}>
                {activeGames.map((game) => (
                  <GameCard key={game.route} game={game} onPress={() => navigation.navigate(game.route)} />
                ))}
              </View>
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.emptyStageCard}>
          <Text style={styles.emptyStageTitle}>Choose an age range to see recommended games</Text>
          <Text style={styles.emptyStageBody}>
            You can still browse every game, but choosing a stage makes it much easier to find the best place to start.
          </Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14
  },
  headerEyebrow: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.textPrimary
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10
  },
  roundButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  roundButtonText: {
    fontSize: 22
  },
  heroCard: {
    borderRadius: 32,
    padding: 22,
    marginBottom: 22,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 12
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  brand: {
    fontSize: 31,
    fontWeight: '800',
    color: palette.textPrimary,
    lineHeight: 38
  },
  subheading: {
    marginTop: 8,
    fontSize: 17,
    color: palette.textSecondary,
    lineHeight: 24
  },
  browseButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  browseButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: palette.textPrimary
  },
  section: {
    marginBottom: 22
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.textSecondary,
    marginBottom: 4
  },
  sectionHint: {
    fontSize: 14,
    color: palette.textSecondary,
    marginBottom: 12,
    lineHeight: 20
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12
  },
  stageSummaryPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  stageSummaryText: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  stageGrid: {
    gap: 12
  },
  stageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  stageCardActive: {
    borderWidth: 3,
    borderColor: palette.secondary,
    backgroundColor: '#F0FDFA'
  },
  stageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start'
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.textPrimary
  },
  stageAge: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: palette.secondary
  },
  stageSelected: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.secondary,
    textTransform: 'uppercase'
  },
  stageBody: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: palette.textSecondary
  },
  stagePills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12
  },
  stagePill: {
    backgroundColor: '#F8FAFC',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  stagePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.textSecondary
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  gameWrap: {
    width: '47%'
  },
  gameCard: {
    borderRadius: 32,
    height: 196,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  gameTop: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  gameIcon: {
    fontSize: 42
  },
  gameTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center'
  },
  gameBottom: {
    width: '100%',
    minHeight: 52,
    justifyContent: 'flex-end'
  },
  gameCaption: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  skillChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 11
  },
  skillChipActive: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#93C5FD'
  },
  skillChipIcon: {
    fontSize: 16
  },
  skillChipText: {
    fontSize: 14,
    fontWeight: '800',
    color: palette.textPrimary
  },
  skillChipTextActive: {
    color: '#1D4ED8'
  },
  skillHeroCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 18
  },
  skillHeroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: palette.textPrimary
  },
  skillHeroBody: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: palette.textSecondary
  },
  emptyStageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 18
  },
  emptyStageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: palette.textPrimary
  },
  emptyStageBody: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: palette.textSecondary
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  }
});
