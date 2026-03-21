import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStoredJson(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export async function setStoredJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures so the app stays usable offline.
  }
}
