# Phase 1 Status

## Purpose
Phase 1 is the launch foundation for Cheery Cubs.

It is not the full 60-game roadmap. It is the point where the app feels like a real product:

- a parent can choose an age range quickly
- a parent can browse by learning area
- the app has a strong starter catalog
- the best games feel worth testing with real families
- the app builds and deploys cleanly

## Phase 1 Scope
Phase 1 includes:

- parent-first home flow
- stage-first discovery
- learning-area browsing
- a separate baby co-play section
- a curated core catalog
- stable web and Expo bundling
- enough variety across categories to support real playtesting

Phase 1 exists to prepare for the bigger catalog goal:

- `6` top-level categories
- `10` distinct games in each category
- `60` core games total

Phase 1 does not include:

- all 60 planned roadmap games
- final visual polish for every game
- app-store-ready analytics, subscriptions, or onboarding
- deep curriculum reporting

## Current Status
Current implemented game count: `49`
Current core-catalog count: `40`
Current extra-play count: `9`
Phase 1 implementation status: `complete, pending full-device QA`
Phase 2 status: `world-around-me expansion started, then curated into core vs extra`
Product review status: `completed on April 11, 2026`

Latest deployed milestone: `April 10, 2026`

Latest deployed batch included:

- parent-first app structure
- documentation set
- Phase 1 letters and numbers wave
- Phase 1 memory wave
- parent-flow curation improvements

Current core category counts:

- `Baby Co-Play`: 6
- `Letters & Reading`: 5
- `Numbers & Counting`: 6
- `Thinking & Patterns`: 8
- `Memory & Focus`: 5
- `World Around Me`: 10

Separate non-core bucket:

- `Extra Play`: 9

Current stage structure:

- `Baby Co-Play`: birth to 12 months
- `Early Learner`: about ages 1 to 2
- `Growing Learner`: about ages 2 to 3
- `Ready for Kindergarten`: about ages 4 to 5

## Recently Added In Phase 1
- `Letter Trace`
- `Upper & Lower Match`
- `Number Match`
- `Build a Scene`
- `Find What Changed`
- `Copy the Pattern`
- `Hide & Remember`
- `Visual Search`

These were added to strengthen the launch catalog in letters, numbers, and thinking games.

## First Phase 2 Additions
- `Body Parts`
- `Food Match`
- `Home Helpers`
- `Clothes Match`
- `Weather Watch`
- `Healthy Habits`
- `Community Helpers`

These are the current `World Around Me` expansion games for Phase 2.

After catalog review and cleanup:

- `World Around Me` was curated down to a true `10-game` core set
- duplicated or lower-priority titles were moved into `Extra Play`
- `Shape Sort Yard` and `Flat or Solid?` were reclassified into `Thinking & Patterns`

## What Is Already In Good Shape
- parent-first home structure
- curated core recommendations on the home flow
- browse-all-games flow
- curated browse sections for core games vs extra activities
- stage and skill metadata in the catalog
- baby co-play section
- sticker milestone system
- deploy flow for GitHub Pages
- linting and export verification

## Biggest Gaps
- some games still need a polish pass after real kid testing
- the catalog is cleaner now, but some overlap still remains inside the core set
- launch documentation, QA notes, and roadmap now exist, but need to stay updated as the catalog grows
- shared UI still has some broken symbol text in common components
- too much of the catalog still leans on the same category-game shell

## Recommended Completion Criteria For Phase 1
Treat Phase 1 as complete when these are true:

- each top-level category has at least `3 to 5` genuinely distinct games
- the best `15 to 20` games feel polished enough for external testing
- duplicate-feeling games are merged, hidden, or reframed
- the home flow feels trustworthy to a parent on first open
- the app can be demoed without obvious rough edges

## Immediate Next Priorities
1. Test the curated core catalog on device
2. Fix the shared UI encoding issues called out in `docs/product-review.md`
3. Build the biggest remaining gaps in `Memory & Focus`
4. Expand `Baby Co-Play` and `Letters & Reading` with more distinct mechanics
5. Keep `Extra Play` available without letting it distort the true `60-game` target
