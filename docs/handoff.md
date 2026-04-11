# Handoff

## Current Project Position
Cheery Cubs now has:

- a parent-first home flow
- a curated core recommendation layer on the home screen
- a curated browse flow that separates core games from extra activities
- stage-based recommendations
- skill-area browsing
- a baby co-play section
- `45` total games
- latest batch deployed to GitHub Pages on `April 10, 2026`

Recent Phase 1 additions:

- `Letter Trace`
- `Upper & Lower Match`
- `Number Match`
- `Build a Scene`
- `Find What Changed`
- `Copy the Pattern`
- `Hide & Remember`
- `Visual Search`

Current Phase 2 additions:

- `Body Parts`
- `Food Match`
- `Home Helpers`

## Most Important Product Decisions So Far
- The app is no longer being treated like a hobby project.
- The home flow is parent-first, not child-first.
- Age ranges are guidance, not rigid placement.
- Baby content is framed as `co-play`, not independent baby screen time.
- Newer games should feel like mini play experiences, not quiz reskins.

## Main Source Files
- game metadata: `src/utils/constants.js`
- navigation: `src/navigation/RootNavigator.jsx`
- parent-facing discovery: `src/components/screens/HomeScreen.jsx`
- browse screen: `src/components/screens/AllGamesScreen.jsx`
- dashboard: `src/components/screens/DashboardScreen.jsx`

## Commands
Install:

```bash
npm install
```

Run lint:

```bash
npm run lint
```

Run Expo:

```bash
npx expo start -c
```

Export web:

```bash
npx expo export -p web
```

Export Android bundle:

```bash
npx expo export --platform android --output-dir dist-android-test
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

## Known Product Gaps
- some games still overlap in learning mechanic
- several newer games still need real child playtesting and polish
- the catalog is larger, but not yet curated tightly enough for launch
- docs should keep tracking deployed milestones after each major batch

## Best Next Moves
1. Test the new `World Around Me` wave on device
2. Review duplicates and merge or hide weak overlaps
3. Decide whether to keep expanding `World Around Me` or pause for polish
4. After this wave, the best next expansion options are more `World Around Me` games or a `Baby Co-Play` pass

## If A New Chat Starts
Share these files first:

- `docs/phase-1-status.md`
- `docs/game-catalog.md`
- `docs/roadmap.md`
- `docs/handoff.md`

Then point the next session at:

- `src/utils/constants.js`
- `src/navigation/RootNavigator.jsx`

That should be enough context to resume work quickly.
