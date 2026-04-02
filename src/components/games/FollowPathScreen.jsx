import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrationCard } from '../common/CelebrationCard';
import { FeedbackBanner } from '../common/FeedbackBanner';
import { GameHeader } from '../common/GameHeader';
import { Screen } from '../common/Screen';
import { useFollowPath } from '../../hooks/gameLogic/useFollowPath';
import { palette } from '../../theme/palette';

function keyFor(row, col) {
  return `${row}-${col}`;
}

function getCellKeyFromPoint(x, y, board, cellSize, gap) {
  if (x < 0 || y < 0) {
    return null;
  }

  const step = cellSize + gap;
  const row = Math.floor(y / step);
  const col = Math.floor(x / step);

  if (row < 0 || row >= board.rows || col < 0 || col >= board.cols) {
    return null;
  }

  const offsetX = x - col * step;
  const offsetY = y - row * step;

  if (offsetX > cellSize || offsetY > cellSize) {
    return null;
  }

  return keyFor(row, col);
}

function TrailTile({
  row,
  col,
  theme,
  cellSize,
  gap,
  walkableSet,
  pathSet,
  visitedSet,
  currentKey,
  goalKey,
  wrongKey
}) {
  const cellKey = keyFor(row, col);
  const isWalkable = walkableSet.has(cellKey);
  const isPath = pathSet.has(cellKey);
  const isVisited = visitedSet.has(cellKey);
  const isCurrent = cellKey === currentKey;
  const isGoal = cellKey === goalKey;
  const isWrong = cellKey === wrongKey;
  const trackSize = Math.max(18, Math.floor(cellSize * 0.46));
  const connectorThickness = Math.max(12, Math.floor(cellSize * 0.22));
  const iconSize = Math.max(26, Math.floor(cellSize * 0.34));

  const neighbors = {
    up: walkableSet.has(keyFor(row - 1, col)),
    right: walkableSet.has(keyFor(row, col + 1)),
    down: walkableSet.has(keyFor(row + 1, col)),
    left: walkableSet.has(keyFor(row, col - 1))
  };

  const connectorColor = isVisited
    ? theme.trailColor
    : isPath
      ? theme.pathColor
      : theme.branchColor;

  const showSpark = !isWalkable && ((row + col) % 3 === 0);

  return (
    <View
      style={[
        styles.tile,
        {
          width: cellSize,
          height: cellSize,
          borderRadius: Math.max(16, Math.floor(cellSize * 0.28)),
          backgroundColor: theme.groundColor
        },
        isWrong && styles.tileWrong
      ]}
    >
      {showSpark ? <View style={[styles.sparkleDot, { backgroundColor: theme.groundAccent }]} /> : null}

      {isWalkable ? (
        <>
          {neighbors.up ? (
            <View
              style={[
                styles.connector,
                {
                  width: connectorThickness,
                  height: Math.floor(cellSize / 2 + gap / 2),
                  left: Math.floor((cellSize - connectorThickness) / 2),
                  top: 0,
                  backgroundColor: connectorColor
                }
              ]}
            />
          ) : null}
          {neighbors.right ? (
            <View
              style={[
                styles.connector,
                {
                  width: Math.floor(cellSize / 2 + gap / 2),
                  height: connectorThickness,
                  right: 0,
                  top: Math.floor((cellSize - connectorThickness) / 2),
                  backgroundColor: connectorColor
                }
              ]}
            />
          ) : null}
          {neighbors.down ? (
            <View
              style={[
                styles.connector,
                {
                  width: connectorThickness,
                  height: Math.floor(cellSize / 2 + gap / 2),
                  left: Math.floor((cellSize - connectorThickness) / 2),
                  bottom: 0,
                  backgroundColor: connectorColor
                }
              ]}
            />
          ) : null}
          {neighbors.left ? (
            <View
              style={[
                styles.connector,
                {
                  width: Math.floor(cellSize / 2 + gap / 2),
                  height: connectorThickness,
                  left: 0,
                  top: Math.floor((cellSize - connectorThickness) / 2),
                  backgroundColor: connectorColor
                }
              ]}
            />
          ) : null}

          <View
            style={[
              styles.trackCore,
              {
                width: trackSize,
                height: trackSize,
                borderRadius: Math.floor(trackSize / 2),
                backgroundColor: connectorColor
              }
            ]}
          />
        </>
      ) : null}

      {isGoal ? (
        <View style={[styles.iconBubble, { backgroundColor: '#FFFFFFEE' }]}>
          <Text style={[styles.iconText, { fontSize: iconSize, color: theme.goalColor }]}>{theme.goal}</Text>
        </View>
      ) : null}

      {isCurrent ? (
        <View style={[styles.iconBubble, styles.currentBubble]}>
          <Text style={[styles.iconText, { fontSize: iconSize, color: theme.travelerColor }]}>{theme.traveler}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function FollowPathScreen({ navigation }) {
  const {
    theme,
    board,
    pathKeys,
    walkableKeys,
    visitedKeys,
    currentKey,
    goalKey,
    score,
    feedback,
    wrongKey,
    showConfetti,
    handleTraceStart,
    handleTraceMove,
    handleTraceEnd,
    speak
  } = useFollowPath();
  const { width, height } = useWindowDimensions();
  const boardRef = useRef(null);
  const boardBoundsRef = useRef({ x: 0, y: 0 });

  const isShortScreen = height < 760;
  const gap = width < 390 ? 6 : 8;
  const maxBoardWidth = Math.min(width - 48, board.cols === 5 ? 330 : 340);
  const maxBoardHeight = isShortScreen ? 270 : 330;
  const cellSize = Math.max(
    44,
    Math.floor(
      Math.min(
        (maxBoardWidth - gap * (board.cols - 1)) / board.cols,
        (maxBoardHeight - gap * (board.rows - 1)) / board.rows
      )
    )
  );
  const boardPixelWidth = cellSize * board.cols + gap * (board.cols - 1);
  const boardPixelHeight = cellSize * board.rows + gap * (board.rows - 1);
  const walkableSet = new Set(walkableKeys);
  const pathSet = new Set(pathKeys);
  const visitedSet = new Set(visitedKeys);

  const refreshBoardBounds = useCallback(() => {
    if (boardRef.current?.measureInWindow) {
      boardRef.current.measureInWindow((x, y) => {
        boardBoundsRef.current = { x, y };
      });
    }
  }, []);

  const handleBoardTouch = (event, type) => {
    const { pageX, pageY } = event.nativeEvent;
    const locationX = pageX - boardBoundsRef.current.x;
    const locationY = pageY - boardBoundsRef.current.y;
    const cellKey = getCellKeyFromPoint(locationX, locationY, board, cellSize, gap);

    if (type === 'start') {
      handleTraceStart(cellKey);
      return;
    }

    if (type === 'move') {
      handleTraceMove(cellKey);
      return;
    }

    handleTraceEnd();
  };

  return (
    <Screen>
      <GameHeader
        title="Trail Adventure"
        score={score}
        onBack={() => navigation.navigate('Home')}
        onSettings={() => navigation.navigate('Settings')}
      />

      <FeedbackBanner feedback={feedback} />
      <CelebrationCard visible={showConfetti} />

      <View style={styles.promptRow}>
        <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={styles.promptCard}>
          <Text style={styles.promptEyebrow}>{theme.name} trail</Text>
          <Text style={styles.promptTitle}>Slide {theme.traveler} to {theme.goal}</Text>
          <Text style={styles.promptBody}>Touch the traveler and trace the road to the goal.</Text>
        </LinearGradient>

        <Pressable onPress={() => speak(`Slide ${theme.traveler} to ${theme.goal}`, 'question')} style={styles.soundButton}>
          <LinearGradient colors={[palette.secondary, '#38BDF8']} style={styles.soundFill}>
            <Text style={styles.soundEmoji}>🔊</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <LinearGradient colors={theme.boardGradient} style={styles.stageCard}>
        <View style={styles.stageTopRow}>
          <View style={styles.stageChip}>
            <Text style={styles.stageChipEmoji}>{theme.traveler}</Text>
            <Text style={styles.stageChipText}>Start here</Text>
          </View>
          <View style={styles.stageChip}>
            <Text style={styles.stageChipEmoji}>{theme.goal}</Text>
            <Text style={styles.stageChipText}>Go here</Text>
          </View>
        </View>

        <View style={styles.boardWrap}>
          <View
            ref={boardRef}
            collapsable={false}
            style={[styles.boardTouchArea, { width: boardPixelWidth, height: boardPixelHeight }]}
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
            {Array.from({ length: board.rows }, (_, row) => (
              <View key={row} style={[styles.boardRow, row < board.rows - 1 && { marginBottom: gap }]}>
                {Array.from({ length: board.cols }, (_, col) => (
                  <View key={`${row}-${col}`} style={col < board.cols - 1 ? { marginRight: gap } : null}>
                    <TrailTile
                      row={row}
                      col={col}
                      theme={theme}
                      cellSize={cellSize}
                      gap={gap}
                      walkableSet={walkableSet}
                      pathSet={pathSet}
                      visitedSet={visitedSet}
                      currentKey={currentKey}
                      goalKey={goalKey}
                      wrongKey={wrongKey}
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footerHint}>
          <Text style={styles.footerHintText}>Trace the bright trail. Little side roads are tricky dead ends.</Text>
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
    marginBottom: 12
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
  stageChipEmoji: {
    fontSize: 18
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
  boardTouchArea: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  boardRow: {
    flexDirection: 'row'
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  tileWrong: {
    borderWidth: 3,
    borderColor: palette.error
  },
  sparkleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.8
  },
  connector: {
    position: 'absolute',
    opacity: 0.98
  },
  trackCore: {
    position: 'absolute'
  },
  iconBubble: {
    width: '70%',
    height: '70%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  currentBubble: {
    backgroundColor: '#FFFFFFEE',
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },
  iconText: {
    fontWeight: '900'
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
