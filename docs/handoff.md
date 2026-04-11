# Handoff

## Current Project Position
Cheery Cubs now has:

- a parent-first home flow
- a curated core recommendation layer on the home screen
- a curated browse flow that separates core games from extra activities
- stage-based recommendations
- skill-area browsing
- a baby co-play section
- `49` total games
- `40` games currently counted toward the long-term core catalog
- `9` games currently parked in `Extra Play`
- latest batch deployed to GitHub Pages on `April 10, 2026`
- detailed review completed on `April 11, 2026`

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
- `Clothes Match`
- `Weather Watch`
- `Healthy Habits`
- `Community Helpers`

Recent catalog cleanup:

- `World Around Me` was curated down to a `10-game` core set
- `Shape Sort Yard` and `Flat or Solid?` were reclassified into `Thinking & Patterns`
- duplicate or lower-priority titles were moved into `Extra Play`

## Most Important Product Decisions So Far
- The app is no longer being treated like a hobby project.
- The home flow is parent-first, not child-first.
- Age ranges are guidance, not rigid placement.
- Baby content is framed as `co-play`, not independent baby screen time.
- Newer games should feel like mini play experiences, not quiz reskins.
- The long-term catalog target is `6 categories x 10 distinct games = 60 core games`.
- `Distinct` is a product rule, not a nice-to-have. We should not fill categories with near-duplicates just to hit the count.

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
- shared UI still has some broken symbol text in common components
- some categories still need more mechanic variety, not just more titles

## Best Next Moves
1. Test the curated core catalog on device
2. Fix the shared UI encoding issue in common components before the next large build wave
3. Build the biggest gap in `Memory & Focus`
4. Expand `Baby Co-Play` and `Letters & Reading` with more distinct mechanics
5. Keep `Extra Play` available without counting it toward the `60-game` core roadmap

## If A New Chat Starts
Share these files first:

- `docs/phase-1-status.md`
- `docs/game-catalog.md`
- `docs/core-catalog-tracker.md`
- `docs/core-catalog-plan.md`
- `docs/product-review.md`
- `docs/roadmap.md`
- `docs/handoff.md`

Then point the next session at:

- `src/utils/constants.js`
- `src/navigation/RootNavigator.jsx`

That should be enough context to resume work quickly.
