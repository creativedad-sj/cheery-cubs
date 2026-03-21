import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppProviders } from './src/contexts/AppProviders';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SessionTimer } from './src/components/common/SessionTimer';
import { StickerPopup } from './src/components/common/StickerPopup';
import { palette } from './src/theme/palette';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.background,
    card: palette.card,
    text: palette.textPrimary,
    border: palette.border,
    primary: palette.primary
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="dark" />
          <RootNavigator />
          <SessionTimer />
          <StickerPopup />
        </NavigationContainer>
      </AppProviders>
    </SafeAreaProvider>
  );
}
