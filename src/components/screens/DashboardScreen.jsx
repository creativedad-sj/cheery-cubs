import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../common/Screen';
import { palette } from '../../theme/palette';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useSettings } from '../../contexts/SettingsContext';
import { childStagesById, gameCatalogById, getGamesForStage, skillAreas } from '../../utils/constants';

function formatPercent(value) {
  return `${Math.round(value)}%`;
}

function StatCard({ label, value, tone = 'primary' }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, tone === 'accent' && styles.statValueAccent]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function InsightCard({ title, value, helper, colors }) {
  return (
    <LinearGradient colors={colors} style={styles.insightCard}>
      <Text style={styles.insightTitle}>{title}</Text>
      <Text style={styles.insightValue}>{value}</Text>
      <Text style={styles.insightHelper}>{helper}</Text>
    </LinearGradient>
  );
}

function ProgressRow({ item }) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressTop}>
        <Text style={styles.progressLabel}>{item.label}</Text>
        <Text style={styles.progressPercent}>{formatPercent(item.accuracy)}</Text>
      </View>
      <View style={styles.progressMeta}>
        <Text style={styles.progressMetaText}>{item.correct} correct</Text>
        <Text style={styles.progressMetaText}>{item.attempts} tries</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(item.accuracy, 6)}%` }]} />
      </View>
    </View>
  );
}

export function DashboardScreen({ navigation }) {
  const { stats } = useGameProgress();
  const { childStageId } = useSettings();
  const selectedStage = childStagesById[childStageId] || null;

  const progressItems = Object.entries(stats)
    .filter(([, value]) => (value.attempts || 0) > 0)
    .map(([gameId, value]) => {
      const attempts = value.attempts || 0;
      const correct = value.correct || 0;
      const accuracy = attempts > 0 ? (correct / attempts) * 100 : 0;
      const game = gameCatalogById[gameId];

      return {
        gameId,
        label: game?.title || gameId,
        skillArea: game?.skillArea || '',
        attempts,
        correct,
        accuracy
      };
    })
    .sort((a, b) => b.attempts - a.attempts || b.accuracy - a.accuracy);

  const skillSummaries = skillAreas
    .filter((skill) => skill.id !== 'extra-play')
    .map((skill) => {
      const games = progressItems.filter((item) => item.skillArea === skill.id);
      const attempts = games.reduce((sum, item) => sum + item.attempts, 0);
      const correct = games.reduce((sum, item) => sum + item.correct, 0);
      const accuracy = attempts > 0 ? (correct / attempts) * 100 : 0;

      return {
        id: skill.id,
        title: skill.title,
        attempts,
        correct,
        accuracy
      };
    })
    .filter((skill) => skill.attempts > 0);

  const totalAttempts = progressItems.reduce((sum, item) => sum + item.attempts, 0);
  const totalCorrect = progressItems.reduce((sum, item) => sum + item.correct, 0);
  const gamesPlayed = progressItems.length;
  const totalAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;
  const favoriteGame = progressItems[0];
  const strongestSkill = [...skillSummaries].sort((a, b) => b.accuracy - a.accuracy || b.correct - a.correct)[0];
  const needsPractice = [...skillSummaries]
    .filter((item) => item.attempts >= 3)
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)[0];
  const recommendedNow = getGamesForStage(childStageId)
    .sort((a, b) => {
      const aAttempts = stats[a.id]?.attempts || 0;
      const bAttempts = stats[b.id]?.attempts || 0;

      return aAttempts - bAttempts || a.recommendedOrder - b.recommendedOrder;
    })[0];

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Parent dashboard</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFFFFF', '#EEFDF6']} style={styles.heroCard}>
        <Text style={styles.heroTitle}>See how your child is doing</Text>
        <Text style={styles.heroBody}>
          Check favorite games, strong skills, and gentle suggestions for what to try next.
        </Text>
        {selectedStage ? (
          <View style={styles.stagePill}>
            <Text style={styles.stagePillText}>
              {selectedStage.title} {'\u00B7'} {selectedStage.ageLabel}
            </Text>
          </View>
        ) : null}
      </LinearGradient>

      <View style={styles.statsRow}>
        <StatCard label="Attempts" value={totalAttempts} />
        <StatCard label="Correct" value={totalCorrect} />
        <StatCard label="Accuracy" value={totalAttempts ? formatPercent(totalAccuracy) : '0%'} tone="accent" />
        <StatCard label="Games" value={gamesPlayed} />
      </View>

      <View style={styles.insightGrid}>
        <InsightCard
          title="Favorite game"
          value={favoriteGame?.label || 'Not yet'}
          helper={favoriteGame ? `${favoriteGame.attempts} tries so far` : 'Play a few games to unlock insights'}
          colors={['#FFFFFF', '#FFF4DB']}
        />
        <InsightCard
          title="Strongest skill"
          value={strongestSkill?.title || 'Not yet'}
          helper={strongestSkill ? `${formatPercent(strongestSkill.accuracy)} accuracy` : 'Play a few games to unlock insights'}
          colors={['#FFFFFF', '#EAFBF1']}
        />
        <InsightCard
          title="Practice next"
          value={needsPractice?.title || 'Everything looks good'}
          helper={needsPractice ? `${formatPercent(needsPractice.accuracy)} accuracy right now` : 'No clear weak spot yet'}
          colors={['#FFFFFF', '#FFF1F2']}
        />
        <InsightCard
          title="Recommended now"
          value={recommendedNow?.title || 'Choose a stage'}
          helper={recommendedNow ? recommendedNow.learningGoal : 'Choose an age range on the home screen to get suggestions'}
          colors={['#FFFFFF', '#EEF2FF']}
        />
      </View>

      <View style={styles.listCard}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Skill progress</Text>
          {skillSummaries.length > 0 ? <Text style={styles.listHint}>Grouped by learning area</Text> : null}
        </View>

        {skillSummaries.length === 0 ? (
          <Text style={styles.empty}>No progress yet. Once your child starts playing, you&apos;ll see learning insights here.</Text>
        ) : (
          skillSummaries
            .sort((a, b) => b.attempts - a.attempts || b.accuracy - a.accuracy)
            .map((item) => <ProgressRow key={item.id} item={{ ...item, label: item.title }} />)
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: palette.textPrimary
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 18
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: palette.textPrimary
  },
  heroBody: {
    marginTop: 8,
    color: palette.textSecondary,
    fontSize: 15,
    lineHeight: 22
  },
  stagePill: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  stagePillText: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.textSecondary
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.primary
  },
  statValueAccent: {
    color: palette.secondary
  },
  statLabel: {
    marginTop: 6,
    color: palette.textSecondary,
    fontSize: 14,
    fontWeight: '700'
  },
  insightGrid: {
    gap: 12,
    marginBottom: 18
  },
  insightCard: {
    borderRadius: 24,
    padding: 18,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: palette.textSecondary
  },
  insightValue: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '800',
    color: palette.textPrimary
  },
  insightHelper: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: palette.textSecondary
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.textPrimary
  },
  listHint: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.textSecondary
  },
  empty: {
    color: palette.textSecondary,
    fontSize: 15
  },
  progressRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7'
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: palette.textPrimary
  },
  progressPercent: {
    fontSize: 15,
    fontWeight: '800',
    color: palette.primary
  },
  progressMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
    marginBottom: 10
  },
  progressMetaText: {
    fontSize: 13,
    color: palette.textSecondary
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#EEF2F7',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: palette.secondary
  }
});
