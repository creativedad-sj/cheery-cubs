import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../common/Screen';
import { palette } from '../../theme/palette';

export function PlaceholderGameScreen({ navigation, route }) {
  const title = route.params?.title || route.name;

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>
          This screen is scaffolded for mobile and ready for the next UI port. The shared mobile navigation,
          storage, settings, and reward systems are already in place.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8
  },
  backButton: {
    alignSelf: 'flex-start',
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
  card: {
    flex: 1,
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: palette.textPrimary
  },
  body: {
    marginTop: 14,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: palette.textSecondary
  }
});
