import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../common/Screen';
import { palette } from '../../theme/palette';
import { useGameProgress } from '../../contexts/GameProgressContext';

const gameLabels = {
  'animal-game': 'Animals',
  counting: 'Counting',
  'tap-count': 'Tap Count',
  'memory-game': 'Memory',
  'odd-one-out': 'Odd One Out',
  'shape-match': 'Shapes',
  'color-match': 'Colors',
  'emotion-game': 'Emotions',
  'sports-game': 'Sports',
  'instruments-game': 'Music',
  'vehicles-game': 'Vehicles',
  'landmarks-game': 'Landmarks'
};

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

  const progressItems = Object.entries(stats)
    .filter(([, value]) => (value.attempts || 0) > 0)
    .map(([gameId, value]) => {
      const attempts = value.attempts || 0;
      const correct = value.correct || 0;
      const accuracy = attempts > 0 ? (correct / attempts) * 100 : 0;

      return {
        gameId,
        label: gameLabels[gameId] || gameId,
        attempts,
        correct,
        accuracy,
        lastPlayed: value.lastPlayed || ''
      };
    })
    .sort((a, b) => b.attempts - a.attempts || b.accuracy - a.accuracy);

  const totalAttempts = progressItems.reduce((sum, item) => sum + item.attempts, 0);
  const totalCorrect = progressItems.reduce((sum, item) => sum + item.correct, 0);
  const gamesPlayed = progressItems.length;
  const totalAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;
  const favoriteGame = progressItems[0];
  const strongestGame = [...progressItems].sort((a, b) => b.accuracy - a.accuracy || b.correct - a.correct)[0];
  const needsPractice = [...progressItems]
    .filter((item) => item.attempts >= 3)
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)[0];

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Parent dashboard</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFFFFF', '#EEFDF6']} style={styles.heroCard}>
        <Text style={styles.heroTitle}>Quick view of your child&apos;s progress</Text>
        <Text style={styles.heroBody}>
          See favorite games, celebrate strong skills, and spot what could use a little more practice.
        </Text>
      </LinearGradient>

      <View style={styles.statsRow}>
        <StatCard label="Attempts" value={totalAttempts} />
        <StatCard label="Correct" value={totalCorrect} />
        <StatCard label="Accuracy" value={totalAttempts ? formatPercent(totalAccuracy) : '0%'} tone="accent" />
        <StatCard label="Games" value={gamesPlayed} />
      </View>

      {progressItems.length > 0 ? (
        <View style={styles.insightGrid}>
          <InsightCard
            title="Favorite game"
            value={favoriteGame?.label || 'Not yet'}
            helper={favoriteGame ? `${favoriteGame.attempts} tries so far` : 'Play a game to see insights'}
            colors={['#FFFFFF', '#FFF4DB']}
          />
          <InsightCard
            title="Strongest skill"
            value={strongestGame?.label || 'Not yet'}
            helper={strongestGame ? `${formatPercent(strongestGame.accuracy)} accuracy` : 'Play a game to see insights'}
            colors={['#FFFFFF', '#EAFBF1']}
          />
          <InsightCard
            title="Practice next"
            value={needsPractice?.label || 'Everything looks good'}
            helper={needsPractice ? `${formatPercent(needsPractice.accuracy)} accuracy right now` : 'No clear weak spot yet'}
            colors={['#FFFFFF', '#FFF1F2']}
          />
        </View>
      ) : null}

      <View style={styles.listCard}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Game progress</Text>
          {progressItems.length > 0 ? <Text style={styles.listHint}>Most played first</Text> : null}
        </View>

        {progressItems.length === 0 ? (
          <Text style={styles.empty}>No progress yet. Start a game to see friendly insights here.</Text>
        ) : (
          progressItems.map((item) => <ProgressRow key={item.gameId} item={item} />)
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
