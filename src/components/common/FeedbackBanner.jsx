import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../../theme/palette';

export function FeedbackBanner({ feedback }) {
  if (!feedback?.show) {
    return null;
  }

  return (
    <View style={[styles.banner, feedback.type === 'success' ? styles.success : styles.error]}>
      <Text style={styles.text}>{feedback.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: 12,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  success: {
    backgroundColor: palette.success
  },
  error: {
    backgroundColor: palette.error
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800'
  }
});
