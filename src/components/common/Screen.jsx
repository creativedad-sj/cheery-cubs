import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { appStyles } from '../../theme/styles';
import { palette } from '../../theme/palette';

export function Screen({ children, scroll = false, contentStyle }) {
  if (scroll) {
    return (
      <SafeAreaView style={appStyles.screen}>
        <LinearGradient colors={[palette.backgroundTop, palette.backgroundBottom]} style={styles.fill}>
          <View style={styles.blobOne} />
          <View style={styles.blobTwo} />
          <ScrollView contentContainerStyle={[appStyles.content, contentStyle]} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={appStyles.screen}>
      <LinearGradient colors={[palette.backgroundTop, palette.backgroundBottom]} style={styles.fill}>
        <View style={styles.blobOne} />
        <View style={styles.blobTwo} />
        <View style={[{ flex: 1, paddingHorizontal: 16, paddingBottom: 16 }, contentStyle]}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  blobOne: {
    position: 'absolute',
    top: -20,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 230, 109, 0.28)'
  },
  blobTwo: {
    position: 'absolute',
    left: -40,
    bottom: 80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(78, 205, 196, 0.16)'
  }
});
