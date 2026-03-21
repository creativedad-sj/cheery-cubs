import React from 'react';
import { CategoryGameScreen } from './CategoryGameScreen';
import { animals } from '../../utils/constants';

export function AnimalGameScreen(props) {
  return (
    <CategoryGameScreen
      {...props}
      title="Animals"
      items={animals}
      gameId="animal-game"
      promptPrefix="Find the"
    />
  );
}
