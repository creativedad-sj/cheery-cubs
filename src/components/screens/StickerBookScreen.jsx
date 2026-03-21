import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../common/Screen';
import { palette } from '../../theme/palette';
import { useStickers } from '../../contexts/StickerContext';
import { stickerMilestones } from '../../utils/constants';

export function StickerBookScreen({ navigation }) {
  const { earnedStickers } = useStickers();
  const earnedIds = earnedStickers.map((item) => item.id);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Sticker book</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFFFFF', '#FFF8D8']} style={styles.heroCard}>
        <Text style={styles.heroTitle}>Tiny wins deserve a big celebration</Text>
        <Text style={styles.summary}>{earnedIds.length} of {stickerMilestones.length} stickers earned</Text>
      </LinearGradient>

      <View style={styles.grid}>
        {stickerMilestones.map((milestone) => {
          const earned = earnedStickers.find((item) => item.id === milestone.id);
          return (
            <View key={milestone.id} style={[styles.card, !earned && styles.lockedCard]}>
              <Text style={styles.emoji}>{earned ? milestone.emoji : '❓'}</Text>
              <Text style={styles.name}>{earned ? milestone.name : 'Mystery Sticker'}</Text>
              <Text style={styles.desc}>{milestone.desc}</Text>
              {earned ? <Text style={styles.date}>{new Date(earned.earnedAt).toLocaleDateString()}</Text> : null}
            </View>
          );
        })}
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
    marginBottom: 8
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: palette.textPrimary
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 16
  },
  heroTitle: {
    fontSize: 22,
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
  summary: {
    fontSize: 16,
    color: palette.textSecondary,
    marginTop: 8
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    minHeight: 198,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  lockedCard: {
    opacity: 0.65,
    backgroundColor: palette.muted
  },
  emoji: {
    fontSize: 44,
    marginBottom: 12
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: palette.textPrimary,
    textAlign: 'center'
  },
  desc: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
    color: palette.textSecondary
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    color: palette.textSecondary
  }
});
