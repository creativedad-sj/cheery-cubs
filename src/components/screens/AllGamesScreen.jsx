import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../common/Screen';
import { useSettings } from '../../contexts/SettingsContext';
import { gameCatalog, skillAreas } from '../../utils/constants';
import { palette } from '../../theme/palette';

function GameCard({ game, recommended, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.gameWrap, pressed && styles.pressed]}>
      <LinearGradient colors={game.colors} style={styles.gameCard}>
        {recommended ? (
          <View style={styles.recommendedPill}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        ) : null}
        <View style={styles.gameTop}>
          <Text style={styles.gameIcon}>{game.icon}</Text>
          <Text style={styles.gameTitle}>{game.title}</Text>
        </View>
        <View style={styles.gameBottom}>
          <Text style={styles.gameMeta}>Best for ages {game.minAgeLabel} to {game.maxAgeLabel}</Text>
          <Text style={styles.gameCaption}>{game.learningGoal}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function AllGamesScreen({ navigation }) {
  const { childStageId } = useSettings();

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>All games</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.heroCard}>
        <Text style={styles.heroTitle}>Browse all games</Text>
        <Text style={styles.heroBody}>
          Explore every game by learning area. Games that match your selected age range appear first.
        </Text>
      </LinearGradient>

      {skillAreas.map((skill) => {
        const games = gameCatalog
          .filter((game) => game.skillArea === skill.id)
          .sort((a, b) => {
            const aRecommended = childStageId && a.recommendedStages.includes(childStageId) ? 0 : 1;
            const bRecommended = childStageId && b.recommendedStages.includes(childStageId) ? 0 : 1;

            return aRecommended - bRecommended || a.recommendedOrder - b.recommendedOrder || a.title.localeCompare(b.title);
          });

        return (
          <View key={skill.id} style={styles.section}>
            <LinearGradient colors={skill.colors} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{skill.title}</Text>
              <Text style={styles.sectionBody}>{skill.description}</Text>
            </LinearGradient>

            <View style={styles.grid}>
              {games.map((game) => (
                <GameCard
                  key={game.route}
                  game={game}
                  recommended={Boolean(childStageId && game.recommendedStages.includes(childStageId))}
                  onPress={() => navigation.navigate(game.route)}
                />
              ))}
            </View>
          </View>
        );
      })}
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
    fontSize: 15,
    lineHeight: 22,
    color: palette.textSecondary
  },
  section: {
    marginBottom: 22
  },
  sectionCard: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.textPrimary
  },
  sectionBody: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
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
    borderRadius: 28,
    height: 214,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  recommendedPill: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '800',
    color: palette.textPrimary,
    textTransform: 'uppercase'
  },
  gameTop: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    gap: 8
  },
  gameIcon: {
    fontSize: 38
  },
  gameTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  gameBottom: {
    width: '100%',
    minHeight: 82,
    justifyContent: 'flex-end'
  },
  gameMeta: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center'
  },
  gameCaption: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center'
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  }
});
