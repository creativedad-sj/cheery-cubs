import React from 'react';
import { CategoryGameScreen } from './CategoryGameScreen';
import { shapes } from '../../utils/constants';

const shapeSymbols = {
  circle: '\u25CF',
  square: '\u25A0',
  triangle: '\u25B2',
  rectangle: '\u25AC',
  star: '\u2605',
  heart: '\u2665',
  oval: '\u2B2D',
  diamond: '\u2666'
};

const normalizedShapes = shapes.map((item) => ({
  ...item,
  emoji: shapeSymbols[item.id] || item.emoji
}));

export function ShapeMatchScreen({ navigation }) {
  return (
    <CategoryGameScreen
      navigation={navigation}
      title="Shapes"
      items={normalizedShapes}
      gameId="shape-match"
      promptPrefix="Find the"
    />
  );
}
