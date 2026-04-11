import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../components/screens/HomeScreen';
import { AllGamesScreen } from '../components/screens/AllGamesScreen';
import { SettingsScreen } from '../components/screens/SettingsScreen';
import { StickerBookScreen } from '../components/screens/StickerBookScreen';
import { DashboardScreen } from '../components/screens/DashboardScreen';
import { AnimalGameScreen } from '../components/games/AnimalGameScreen';
import { CountingScreen } from '../components/games/CountingScreen';
import { CategoryGameScreen } from '../components/games/CategoryGameScreen';
import { ShapeMatchScreen } from '../components/games/ShapeMatchScreen';
import { ColorMatchScreen } from '../components/games/ColorMatchScreen';
import { TapCountScreen } from '../components/games/TapCountScreen';
import { MemoryGameScreen } from '../components/games/MemoryGameScreen';
import { FindWhatChangedScreen } from '../components/games/FindWhatChangedScreen';
import { CopyPatternScreen } from '../components/games/CopyPatternScreen';
import { HideAndRememberScreen } from '../components/games/HideAndRememberScreen';
import { VisualSearchScreen } from '../components/games/VisualSearchScreen';
import { OddOneOutScreen } from '../components/games/OddOneOutScreen';
import { PatternBuilderScreen } from '../components/games/PatternBuilderScreen';
import { ShadowMatchScreen } from '../components/games/ShadowMatchScreen';
import { LetterHuntScreen } from '../components/games/LetterHuntScreen';
import { FollowPathScreen } from '../components/games/FollowPathScreen';
import { CountAndPackScreen } from '../components/games/CountAndPackScreen';
import { WhichHasMoreScreen } from '../components/games/WhichHasMoreScreen';
import { ShapeSortYardScreen } from '../components/games/ShapeSortYardScreen';
import { NumberTraceScreen } from '../components/games/NumberTraceScreen';
import { NumberMatchScreen } from '../components/games/NumberMatchScreen';
import { RhymeTimeScreen } from '../components/games/RhymeTimeScreen';
import { FlatOrSolidScreen } from '../components/games/FlatOrSolidScreen';
import { BeginningSoundsScreen } from '../components/games/BeginningSoundsScreen';
import { MakeTenScreen } from '../components/games/MakeTenScreen';
import { StorySequenceScreen } from '../components/games/StorySequenceScreen';
import { SameOrDifferentScreen } from '../components/games/SameOrDifferentScreen';
import { ComposeAndDecomposeScreen } from '../components/games/ComposeAndDecomposeScreen';
import { BuildASceneScreen } from '../components/games/BuildASceneScreen';
import { LetterTraceScreen } from '../components/games/LetterTraceScreen';
import { UpperLowerMatchScreen } from '../components/games/UpperLowerMatchScreen';
import { WordFamiliesScreen } from '../components/games/WordFamiliesScreen';
import { BabyPeekabooScreen } from '../components/games/BabyPeekabooScreen';
import { BabyPatACakeScreen } from '../components/games/BabyPatACakeScreen';
import { BabyByeByeScreen } from '../components/games/BabyByeByeScreen';
import { BabyFindToyScreen } from '../components/games/BabyFindToyScreen';
import { BabyPutInTakeOutScreen } from '../components/games/BabyPutInTakeOutScreen';
import { BabyMirrorPlayScreen } from '../components/games/BabyMirrorPlayScreen';
import {
  bodyParts,
  emotions,
  foods,
  homeHelpers,
  instruments,
  landmarks,
  sportsEquipment,
  vehicles
} from '../utils/constants';

const Stack = createNativeStackNavigator();

function EmotionGameScreen(props) {
  return <CategoryGameScreen {...props} title="Emotions" items={emotions} gameId="emotion-game" promptPrefix="Find the" />;
}

function SportsGameScreen(props) {
  return <CategoryGameScreen {...props} title="Sports" items={sportsEquipment} gameId="sports-game" promptPrefix="Find the" />;
}

function InstrumentsGameScreen(props) {
  return <CategoryGameScreen {...props} title="Music" items={instruments} gameId="instruments-game" promptPrefix="Find the" />;
}

function VehiclesGameScreen(props) {
  return <CategoryGameScreen {...props} title="Vehicles" items={vehicles} gameId="vehicles-game" promptPrefix="Find the" />;
}

function LandmarksGameScreen(props) {
  return <CategoryGameScreen {...props} title="Landmarks" items={landmarks} gameId="landmarks-game" promptPrefix="Find the" />;
}

function BodyPartsScreen(props) {
  return <CategoryGameScreen {...props} title="Body Parts" items={bodyParts} gameId="body-parts" promptPrefix="Point to the" />;
}

function FoodMatchScreen(props) {
  return <CategoryGameScreen {...props} title="Food Match" items={foods} gameId="food-match" promptPrefix="Find the" />;
}

function HomeHelpersScreen(props) {
  return <CategoryGameScreen {...props} title="Home Helpers" items={homeHelpers} gameId="home-helpers" promptPrefix="Find the" />;
}

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AllGames" component={AllGamesScreen} />
      <Stack.Screen name="BabyPeekaboo" component={BabyPeekabooScreen} />
      <Stack.Screen name="BabyPatACake" component={BabyPatACakeScreen} />
      <Stack.Screen name="BabyByeBye" component={BabyByeByeScreen} />
      <Stack.Screen name="BabyFindToy" component={BabyFindToyScreen} />
      <Stack.Screen name="BabyPutInTakeOut" component={BabyPutInTakeOutScreen} />
      <Stack.Screen name="BabyMirrorPlay" component={BabyMirrorPlayScreen} />
      <Stack.Screen name="Animals" component={AnimalGameScreen} />
      <Stack.Screen name="Counting" component={CountingScreen} />
      <Stack.Screen name="CountAndPack" component={CountAndPackScreen} />
      <Stack.Screen name="ShapeMatch" component={ShapeMatchScreen} />
      <Stack.Screen name="ShapeSortYard" component={ShapeSortYardScreen} />
      <Stack.Screen name="FlatOrSolid" component={FlatOrSolidScreen} />
      <Stack.Screen name="ColorMatch" component={ColorMatchScreen} />
      <Stack.Screen name="BodyParts" component={BodyPartsScreen} />
      <Stack.Screen name="FoodMatch" component={FoodMatchScreen} />
      <Stack.Screen name="EmotionGame" component={EmotionGameScreen} />
      <Stack.Screen name="HomeHelpers" component={HomeHelpersScreen} />
      <Stack.Screen name="SportsGame" component={SportsGameScreen} />
      <Stack.Screen name="InstrumentsGame" component={InstrumentsGameScreen} />
      <Stack.Screen name="VehiclesGame" component={VehiclesGameScreen} />
      <Stack.Screen name="LandmarksGame" component={LandmarksGameScreen} />
      <Stack.Screen name="LetterHunt" component={LetterHuntScreen} />
      <Stack.Screen name="RhymeTime" component={RhymeTimeScreen} />
      <Stack.Screen name="BeginningSounds" component={BeginningSoundsScreen} />
      <Stack.Screen name="WordFamilies" component={WordFamiliesScreen} />
      <Stack.Screen name="TapCount" component={TapCountScreen} />
      <Stack.Screen name="NumberMatch" component={NumberMatchScreen} />
      <Stack.Screen name="WhichHasMore" component={WhichHasMoreScreen} />
      <Stack.Screen name="NumberTrace" component={NumberTraceScreen} />
      <Stack.Screen name="LetterTrace" component={LetterTraceScreen} />
      <Stack.Screen name="UpperLowerMatch" component={UpperLowerMatchScreen} />
      <Stack.Screen name="MakeTen" component={MakeTenScreen} />
      <Stack.Screen name="ComposeAndDecompose" component={ComposeAndDecomposeScreen} />
      <Stack.Screen name="MemoryGame" component={MemoryGameScreen} />
      <Stack.Screen name="FindWhatChanged" component={FindWhatChangedScreen} />
      <Stack.Screen name="CopyPattern" component={CopyPatternScreen} />
      <Stack.Screen name="HideAndRemember" component={HideAndRememberScreen} />
      <Stack.Screen name="VisualSearch" component={VisualSearchScreen} />
      <Stack.Screen name="OddOneOut" component={OddOneOutScreen} />
      <Stack.Screen name="SameOrDifferent" component={SameOrDifferentScreen} />
      <Stack.Screen name="PatternBuilder" component={PatternBuilderScreen} />
      <Stack.Screen name="StorySequence" component={StorySequenceScreen} />
      <Stack.Screen name="ShadowMatch" component={ShadowMatchScreen} />
      <Stack.Screen name="BuildAScene" component={BuildASceneScreen} />
      <Stack.Screen name="FollowPath" component={FollowPathScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="StickerBook" component={StickerBookScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
