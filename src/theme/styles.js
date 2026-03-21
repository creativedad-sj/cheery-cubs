import { StyleSheet } from 'react-native';
import { palette } from './palette';

export const appStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.textPrimary
  },
  subtitle: {
    fontSize: 16,
    color: palette.textSecondary
  }
});
