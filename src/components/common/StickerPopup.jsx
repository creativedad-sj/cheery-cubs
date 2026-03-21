import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useStickers } from '../../contexts/StickerContext';
import { stickerMilestones } from '../../utils/constants';
import { palette } from '../../theme/palette';

export function StickerPopup() {
  const { newSticker, dismissNewSticker } = useStickers();
  const sticker = newSticker ? stickerMilestones.find((item) => item.id === newSticker.id) || newSticker : null;

  return (
    <Modal visible={Boolean(sticker)} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>New Sticker!</Text>
          <Text style={styles.emoji}>{sticker?.emoji}</Text>
          <Text style={styles.name}>{sticker?.name}</Text>
          <Text style={styles.desc}>{sticker?.desc}</Text>
          <Pressable onPress={dismissNewSticker} style={styles.button}>
            <Text style={styles.buttonText}>Awesome</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: palette.textPrimary
  },
  emoji: {
    fontSize: 56,
    marginTop: 12
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: palette.textPrimary,
    marginTop: 12
  },
  desc: {
    marginTop: 8,
    textAlign: 'center',
    color: palette.textSecondary,
    fontSize: 16
  },
  button: {
    marginTop: 18,
    backgroundColor: palette.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  }
});
