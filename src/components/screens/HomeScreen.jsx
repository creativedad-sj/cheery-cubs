import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../common/Screen';
import { gameSections } from '../../utils/constants';
import { palette } from '../../theme/palette';

function GameTile({ game, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.tileWrap, pressed && styles.pressed]}>
      <LinearGradient colors={game.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tile}>
        <Text style={styles.tileEmoji}>{game.emoji}</Text>
        <Text style={styles.tileLabel}>{game.title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function HomeScreen({ navigation }) {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <Pressable onPress={() => navigation.navigate('StickerBook')} style={styles.roundButton}>
            <Text style={styles.roundButtonText}>🏆</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Dashboard')} style={styles.roundButton}>
            <Text style={styles.roundButtonText}>📊</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Settings')} style={styles.roundButton}>
            <Text style={styles.roundButtonText}>⚙️</Text>
          </Pressable>
        </View>
      </View>

      <LinearGradient colors={['#FFEDD5', '#FFFFFF']} style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Ages 1 to 4</Text>
        </View>
        <Text style={styles.brand}>Playful learning for little kids</Text>
        <Text style={styles.subheading}>Big buttons, simple prompts, and quick games parents can trust.</Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStatChip}>
            <Text style={styles.heroStatEmoji}>🖐️</Text>
            <Text style={styles.heroStatText}>Easy taps</Text>
          </View>
          <View style={styles.heroStatChip}>
            <Text style={styles.heroStatEmoji}>🔊</Text>
            <Text style={styles.heroStatText}>Voice cues</Text>
          </View>
          <View style={styles.heroStatChip}>
            <Text style={styles.heroStatEmoji}>🧠</Text>
            <Text style={styles.heroStatText}>Short lessons</Text>
          </View>
        </View>
      </LinearGradient>

      {gameSections.map((section) => (
        <View key={section.label} style={styles.section}>
          <Text style={styles.sectionLabel}>{section.label}</Text>
          <Text style={styles.sectionHint}>
            {section.label === 'Learn' ? 'Name, match, and recognize' : 'Count, remember, and spot differences'}
          </Text>
          <View style={styles.grid}>
            {section.games.map((game) => (
              <GameTile key={game.route} game={game} onPress={() => navigation.navigate(game.route)} />
            ))}
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginBottom: 14
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
  heroStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16
  },
  heroStatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999
  },
  heroStatEmoji: {
    fontSize: 16
  },
  heroStatText: {
    fontSize: 14,
    fontWeight: '700',
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
    marginBottom: 12
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  tileWrap: {
    width: '47%'
  },
  tile: {
    borderRadius: 32,
    minHeight: 158,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  tileEmoji: {
    fontSize: 48
  },
  tileLabel: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center'
  },
  pressed: {
    transform: [{ scale: 0.97 }]
  }
});
