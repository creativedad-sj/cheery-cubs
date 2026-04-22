# Solution Architecture

## Overview
Cheery Cubs is a catalog-driven Expo React Native application. The app combines shared UI shells, game-specific screens, metadata-driven discovery, and local persistence for progress and settings.

## Technology Stack
- `React 19`
- `React Native 0.81`
- `Expo 54`
- `React Navigation`
- `AsyncStorage`
- `expo-speech`
- `expo-haptics`
- `expo-linear-gradient`
- `react-native-reanimated`
- `gh-pages` for GitHub Pages deployment

## High-Level Architecture

### App boot
- [App.js](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/App.js)
- [AppProviders.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/contexts/AppProviders.jsx)
- [RootNavigator.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/navigation/RootNavigator.jsx)

The app boots into shared providers, then a native stack navigator controls all parent screens and game screens.

### Shared state
State is managed through three context providers:

- [SettingsContext.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/contexts/SettingsContext.jsx)
- [GameProgressContext.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/contexts/GameProgressContext.jsx)
- [StickerContext.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/contexts/StickerContext.jsx)

### Local persistence
Persistent data uses AsyncStorage through:

- [storage.js](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/utils/storage.js)

Current storage domains:

- settings
- game progress and difficulty
- earned stickers

### Catalog and curriculum metadata
The app is strongly metadata-driven through:

- [constants.js](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/utils/constants.js)

This file currently holds:

- game catalog metadata
- stage definitions
- skill-area definitions
- category datasets
- sticker milestone metadata

This is effectively the app's content registry and discovery layer.

## UI Layers

### Parent-facing screens
- [HomeScreen.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/screens/HomeScreen.jsx)
- [AllGamesScreen.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/screens/AllGamesScreen.jsx)
- [DashboardScreen.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/screens/DashboardScreen.jsx)
- [SettingsScreen.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/screens/SettingsScreen.jsx)
- [StickerBookScreen.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/screens/StickerBookScreen.jsx)

These screens handle discovery, guidance, progress, and parent controls.

### Shared presentation layer
- [Screen.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/common/Screen.jsx)
- [GameHeader.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/common/GameHeader.jsx)
- [QuestionCard.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/common/QuestionCard.jsx)
- [BabyGameShell.jsx](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/src/components/common/BabyGameShell.jsx)

This layer provides the app's reusable layout, gradients, headers, prompts, and common shells.

### Game screens
Game screens live in:

- `src/components/games`

Game logic hooks live in:

- `src/hooks/gameLogic`

## Current Implementation Pattern
There are currently two broad game implementation styles:

1. `distinct custom games`
   - examples: `Follow Path`, `Pattern Builder`, `Build a Scene`, `Visual Search`
2. `shared category-shell games`
   - many noun-matching and recognition games routed through `CategoryGameScreen`

This is the main architecture tradeoff in the current codebase:

- it is efficient to add content quickly
- but too much reuse here reduces product distinctness

## Deployment Model
Development:

- Expo local dev server
- Expo Go or simulator

Verification:

- lint
- Expo web export
- Expo Android export

Production web publishing:

- `expo export -p web`
- `gh-pages -d dist --nojekyll`

## Known Technical Debt
- broken shared symbol text in some common UI components
- a large content registry concentrated in one constants file
- repeated category-shell interaction across too many games
- no formal component-level design system beyond shared style files

## Architectural Recommendation
The next technical step should be to keep the catalog-driven model, but standardize around a small set of reusable play templates:

- `pick / match`
- `trace`
- `sort`
- `build / place`
- `memory / attention`
- `baby co-play`

That keeps implementation efficient without making the catalog feel repetitive.
