import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ParentPinModal } from '../common/ParentPinModal';
import { Screen } from '../common/Screen';
import { palette } from '../../theme/palette';
import { useSettings } from '../../contexts/SettingsContext';
import { childStages } from '../../utils/constants';

const questionModeOptions = [
  { value: 'image', icon: '🖼️', label: 'Image', desc: 'Show a picture cue' },
  { value: 'sound', icon: '🔊', label: 'Sound', desc: 'Play the question aloud' },
  { value: 'text', icon: '📖', label: 'Text', desc: 'Show the written clue' }
];

const sessionOptions = [0, 5, 10, 15, 20, 30];

function ToggleRow({ label, caption, value, onPress }) {
  return (
    <View style={styles.rowCard}>
      <View style={styles.rowCopy}>
        <Text style={styles.rowLabel}>{label}</Text>
        {caption ? <Text style={styles.rowCaption}>{caption}</Text> : null}
      </View>
      <Pressable onPress={onPress} style={[styles.toggle, value && styles.toggleOn]}>
        <View style={[styles.toggleKnob, value && styles.toggleKnobOn]} />
      </Pressable>
    </View>
  );
}

export function SettingsScreen({ navigation }) {
  const {
    soundEnabled,
    vibrationEnabled,
    spokenQuestionEnabled,
    childStageId,
    parentPin,
    toggleSound,
    toggleVibration,
    toggleSpokenQuestion,
    questionModes,
    toggleQuestionMode,
    sessionMinutes,
    setSessionMinutes,
    setChildStageId,
    setParentPin,
    clearParentPin,
    verifyParentPin
  } = useSettings();
  const [pinModalMode, setPinModalMode] = React.useState(null);
  const [pendingSessionMinutes, setPendingSessionMinutes] = React.useState(null);

  const openCreatePin = () => {
    setPinModalMode(parentPin ? 'verify-change-pin' : 'create');
  };

  const openVerifyForSession = (value) => {
    if (!parentPin) {
      setPendingSessionMinutes(value);
      setPinModalMode('create');
      return;
    }

    setPendingSessionMinutes(value);
    setPinModalMode('verify-session');
  };

  const handlePinConfirm = (value) => {
    if (pinModalMode === 'verify-change-pin') {
      setPinModalMode('create-change-pin');
      return;
    }

    if (pinModalMode === 'create' || pinModalMode === 'create-change-pin') {
      setParentPin(value);
      if (pendingSessionMinutes !== null) {
        setSessionMinutes(pendingSessionMinutes);
        setPendingSessionMinutes(null);
      }
    }

    if (pinModalMode === 'verify-session') {
      setSessionMinutes(pendingSessionMinutes);
      setPendingSessionMinutes(null);
    }

    if (pinModalMode === 'verify-remove-pin') {
      clearParentPin();
    }

    setPinModalMode(null);
  };

  const handlePinClose = () => {
    setPendingSessionMinutes(null);
    setPinModalMode(null);
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Parent controls</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      <LinearGradient colors={['#FFFFFF', '#FFF9EE']} style={styles.heroCard}>
        <Text style={styles.heroTitle}>Make playtime feel safe and simple</Text>
        <Text style={styles.heroBody}>
          Choose the app feedback your child gets, how each question appears, and how long a session should last.
        </Text>
      </LinearGradient>

      <ToggleRow
        label="Sound Effects"
        caption="Celebration sounds, taps, and game feedback"
        value={soundEnabled}
        onPress={toggleSound}
      />
      <ToggleRow
        label="Vibration"
        caption="Gentle touch feedback on taps and answers"
        value={vibrationEnabled}
        onPress={toggleVibration}
      />
      <ToggleRow
        label="Spoken Questions"
        caption="Lets the app read the question prompt aloud"
        value={spokenQuestionEnabled}
        onPress={toggleSpokenQuestion}
      />

      <Text style={styles.sectionTitle}>Question Shows</Text>
      <Text style={styles.sectionBody}>
        Pick how the question appears. Answer choices still keep pictures so young children can always tap the right match.
      </Text>
      <View style={styles.optionGrid}>
        {questionModeOptions.map((mode) => {
          const isActive = questionModes.includes(mode.value);
          const isOnly = isActive && questionModes.length === 1;
          const isDisabled = mode.value === 'sound' && !spokenQuestionEnabled;
          const optionDesc = isDisabled ? 'Tap to turn on Spoken Questions too' : mode.desc;

          return (
            <Pressable
              key={mode.value}
              onPress={() => !isOnly && toggleQuestionMode(mode.value)}
              style={[
                styles.modeCard,
                isActive && styles.modeCardActive,
                isOnly && styles.disabledCard
              ]}
            >
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <Text style={styles.modeLabel}>{mode.label}</Text>
              <Text style={[styles.modeDesc, isDisabled && styles.modeDescHint]}>{optionDesc}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Screen Time</Text>
      <View style={styles.timeGrid}>
        {sessionOptions.map((value) => (
          <Pressable
            key={value}
            onPress={() => openVerifyForSession(value)}
            style={[styles.timeCard, sessionMinutes === value && styles.timeCardActive]}
          >
            <Text style={styles.timeText}>{value === 0 ? 'Off' : `${value}m`}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Child Stage</Text>
      <Text style={styles.sectionBody}>
        Pick the stage that feels best right now. This helps the home screen recommend the most helpful games first.
      </Text>
      <View style={styles.stageGrid}>
        {childStages.map((stage) => {
          const selected = childStageId === stage.id;

          return (
            <Pressable
              key={stage.id}
              onPress={() => setChildStageId(stage.id)}
              style={[styles.stageCard, selected && styles.stageCardActive]}
            >
              <Text style={styles.stageTitle}>{stage.title}</Text>
              <Text style={styles.stageAge}>{stage.ageLabel}</Text>
              <Text style={styles.stageDesc}>{stage.description}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Parent PIN</Text>
      <View style={styles.pinCard}>
        <View style={styles.pinCopy}>
          <Text style={styles.pinTitle}>{parentPin ? 'PIN protection is on' : 'Add a parent PIN'}</Text>
          <Text style={styles.pinBody}>
            {parentPin
              ? 'A 4-digit PIN is required to change screen time and unlock more time after timeout.'
              : 'Set a 4-digit PIN so children cannot extend playtime on their own.'}
          </Text>
        </View>
        <View style={styles.pinActions}>
          <Pressable onPress={openCreatePin} style={styles.pinButton}>
            <Text style={styles.pinButtonText}>{parentPin ? 'Change PIN' : 'Set PIN'}</Text>
          </Pressable>
          {parentPin ? (
            <Pressable onPress={() => setPinModalMode('verify-remove-pin')} style={styles.pinGhostButton}>
              <Text style={styles.pinGhostText}>Remove PIN</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <ParentPinModal
        visible={Boolean(pinModalMode)}
        mode={pinModalMode === 'create' || pinModalMode === 'create-change-pin' ? 'create' : 'verify'}
        title={
          pinModalMode === 'create' || pinModalMode === 'create-change-pin'
            ? parentPin
              ? 'Change parent PIN'
              : 'Create parent PIN'
            : pinModalMode === 'verify-change-pin'
              ? 'Verify current PIN'
            : pinModalMode === 'verify-remove-pin'
              ? 'Remove parent PIN'
              : 'Parent PIN required'
        }
        description={
          pinModalMode === 'create' || pinModalMode === 'create-change-pin'
            ? 'Choose a simple 4-digit code that only the parent knows.'
            : pinModalMode === 'verify-change-pin'
              ? 'Enter the current PIN before changing it.'
            : pinModalMode === 'verify-remove-pin'
              ? 'Enter the current PIN to remove protection.'
              : 'Enter the parent PIN to change the screen-time limit.'
        }
        confirmLabel={
          pinModalMode === 'verify-remove-pin'
            ? 'Remove PIN'
            : pinModalMode === 'create' || pinModalMode === 'create-change-pin'
              ? 'Save PIN'
              : 'Unlock'
        }
        onClose={handlePinClose}
        onConfirm={handlePinConfirm}
        verifyPin={verifyParentPin}
      />
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
  heroBody: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: palette.textSecondary
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
  rowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  rowCopy: {
    flex: 1,
    paddingRight: 16
  },
  rowLabel: {
    fontSize: 19,
    fontWeight: '700',
    color: palette.textPrimary
  },
  rowCaption: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: palette.textSecondary
  },
  toggle: {
    width: 58,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#CBD5E1',
    padding: 4,
    justifyContent: 'center'
  },
  toggleOn: {
    backgroundColor: palette.success
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF'
  },
  toggleKnobOn: {
    alignSelf: 'flex-end'
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 19,
    fontWeight: '800',
    color: palette.textSecondary
  },
  sectionBody: {
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
    color: palette.textSecondary
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  modeCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    alignItems: 'center',
    minHeight: 148
  },
  modeCardActive: {
    borderWidth: 3,
    borderColor: palette.primary,
    backgroundColor: '#FFF1F1'
  },
  disabledCard: {
    opacity: 0.8
  },
  modeIcon: {
    fontSize: 31,
    marginBottom: 8
  },
  modeLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: palette.textPrimary
  },
  modeDesc: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
    color: palette.textSecondary
  },
  modeDescHint: {
    color: palette.primary
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  stageGrid: {
    gap: 10
  },
  stageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  stageCardActive: {
    borderWidth: 3,
    borderColor: palette.secondary,
    backgroundColor: '#F0FDFA'
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: palette.textPrimary
  },
  stageAge: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: palette.secondary
  },
  stageDesc: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: palette.textSecondary
  },
  timeCard: {
    width: '15%',
    minWidth: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center'
  },
  timeCardActive: {
    borderWidth: 3,
    borderColor: palette.primary,
    backgroundColor: '#FFF1F1'
  },
  timeText: {
    fontSize: 16,
    fontWeight: '800',
    color: palette.textPrimary
  },
  pinCard: {
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  pinCopy: {
    marginBottom: 14
  },
  pinTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: palette.textPrimary
  },
  pinBody: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: palette.textSecondary
  },
  pinActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap'
  },
  pinButton: {
    backgroundColor: palette.primary,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 11
  },
  pinButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800'
  },
  pinGhostButton: {
    backgroundColor: '#FFF1F2',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 11
  },
  pinGhostText: {
    color: '#BE123C',
    fontSize: 15,
    fontWeight: '800'
  }
});
