import React, { useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useNumberTrace } from '../../hooks/gameLogic/useNumberTrace';
import { palette } from '../../theme/palette';

function TraceLine({ from, to, traced }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const thickness = 10;

  return (
    <View
      style={[
        styles.traceLine,
        {
          left: from.x + dx / 2 - length / 2,
          top: from.y + dy / 2 - thickness / 2,
          width: length,
          height: thickness,
          backgroundColor: traced ? '#14B8A6' : '#CBD5E1',
          transform: [{ rotate: `${angle}rad` }]
        }
      ]}
    />
  );
}

export function NumberTraceScreen({ navigation }) {
  const { template, activeIndex, score, feedback, showConfetti, handleTraceStart, handleTraceMove, handleTraceEnd, speak } = useNumberTrace();
  const { width, height } = useWindowDimensions();
  const boardRef = useRef(null);
  const boardBoundsRef = useRef({ x: 0, y: 0 });
  const boardSize = Math.max(220, Math.min(width - 52, height < 760 ? 250 : 290));
  const traceThreshold = Math.max(20, boardSize * 0.08);

  const points = useMemo(
    () =>
      template.points.map((point) => ({
        x: point.x * boardSize,
        y: point.y * boardSize
      })),
    [boardSize, template.points]
  );

  const refreshBoardBounds = () => {
    if (boardRef.current?.measureInWindow) {
      boardRef.current.measureInWindow((x, y) => {
        boardBoundsRef.current = { x, y };
      });
    }
  };

  const handleBoardTouch = (event, type) => {
    const { pageX, pageY } = event.nativeEvent;
    const x = pageX - boardBoundsRef.current.x;
    const y = pageY - boardBoundsRef.current.y;

    if (type === 'start') {
      handleTraceStart(x, y, points, traceThreshold);
      return;
    }

    if (type === 'move') {
      handleTraceMove(x, y, points, traceThreshold);
      return;
    }

    handleTraceEnd();
  };

  return (
    <Screen>
      <GameHeader
        title="Number Trace"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#ECFEFF']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>Trace the number</Text>
          <Text style={styles.promptTitle}>Trace {template.digit}</Text>
          <Text style={styles.promptBody}>Start on the green dot and slide to the orange dot.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Trace the number ${template.digit}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={['#ECFEFF', '#CCFBF1']} style={styles.stageCard}>
        <View style={styles.stageTopRow}>
          <View style={styles.stageChip}>
            <View style={[styles.dotLegend, { backgroundColor: '#22C55E' }]} />
            <Text style={styles.stageChipText}>Start</Text>
          </View>
          <View style={styles.stageChip}>
            <View style={[styles.dotLegend, { backgroundColor: '#F97316' }]} />
            <Text style={styles.stageChipText}>Finish</Text>
          </View>
        </View>

        <View style={styles.boardWrap}>
          <View
            ref={boardRef}
            collapsable={false}
            style={[styles.traceBoard, { width: boardSize, height: boardSize }]}
            onLayout={refreshBoardBounds}
            onStartShouldSetResponder={() => true}
            onStartShouldSetResponderCapture={() => true}
            onMoveShouldSetResponder={() => true}
            onMoveShouldSetResponderCapture={() => true}
            onResponderGrant={(event) => handleBoardTouch(event, 'start')}
            onResponderMove={(event) => handleBoardTouch(event, 'move')}
            onResponderRelease={(event) => handleBoardTouch(event, 'end')}
            onResponderTerminate={(event) => handleBoardTouch(event, 'end')}
          >
            <Text style={[styles.bigDigit, { fontSize: boardSize * 0.72 }]}>{template.digit}</Text>

            {points.slice(0, -1).map((point, index) => (
              <TraceLine key={`line-${index}`} from={point} to={points[index + 1]} traced={index < activeIndex} />
            ))}

            {points.map((point, index) => {
              const isStart = index === 0;
              const isEnd = index === points.length - 1;
              const isTraced = index <= activeIndex;

              return (
                <View
                  key={`dot-${index}`}
                  style={[
                    styles.traceDot,
                    {
                      left: point.x - 14,
                      top: point.y - 14,
                      backgroundColor: isStart ? '#22C55E' : isEnd ? '#F97316' : isTraced ? '#14B8A6' : '#FFFFFF',
                      borderColor: isTraced ? '#0F766E' : '#94A3B8'
                    }
                  ]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Lift your finger and start again from your last dot if you need to.</Text>
        </View>
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  promptRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    marginBottom: 12
  },
  promptCard: {
    flex: 1,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  promptEyebrow: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 6
  },
  promptTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: palette.textPrimary,
    marginBottom: 4
  },
  promptBody: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: palette.textSecondary
  },
  soundButton: {
    width: 64,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  soundFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  soundEmoji: {
    fontSize: 28
  },
  stageCard: {
    flex: 1,
    borderRadius: 32,
    padding: 14,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  stageTopRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10
  },
  stageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999
  },
  dotLegend: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  stageChipText: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.textPrimary
  },
  boardWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  traceBoard: {
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.82)',
    overflow: 'hidden'
  },
  bigDigit: {
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
    fontWeight: '900',
    color: 'rgba(15, 118, 110, 0.12)'
  },
  traceLine: {
    position: 'absolute',
    borderRadius: 999
  },
  traceDot: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3
  },
  footerHint: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.84)',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  footerHintText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: palette.textSecondary,
    textAlign: 'center'
  }
});
