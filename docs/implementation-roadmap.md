# Implementation Roadmap

## Objective
Take Cheery Cubs from a promising prototype into a launch-ready product with:

- a trusted parent-first experience
- a balanced `60-game` core catalog
- a smaller `Extra Play` bucket for non-core content
- stable build, export, and deployment processes

## Current Baseline
Current state:

- `49` implemented games
- `40` counted toward the core catalog
- `9` in `Extra Play`
- `20` core games still to build

## Workstreams

### Workstream 1: Product Polish
Focus:

- fix broken shared symbol text
- improve parent-facing polish
- reduce repeated prompt-card feel in core flows
- make stage styling feel more age-appropriate

### Workstream 2: Core Catalog Completion
Priority order:

1. `Memory & Focus`
2. `Baby Co-Play`
3. `Letters & Reading`
4. `Numbers & Counting`
5. `Thinking & Patterns`
6. `World Around Me` polish only

### Workstream 3: Launch Hardening
Focus:

- device QA across iOS and Expo Go
- small-screen layout validation
- catalog curation and duplicate control
- release checklist discipline

## Delivery Phases

### Phase A: Stabilize The Current Product
Success criteria:

- shared UI symbol issue fixed
- current core games smoke-tested on device
- documentation set consolidated
- temp files and generated outputs cleaned from the repo workspace

### Phase B: Complete The Core Catalog
Success criteria:

- `60` core games reached
- every category has `10` distinct games
- no category is padded by near-duplicate wrappers
- `Extra Play` remains separated from the core learning path

### Phase C: Launch Readiness
Success criteria:

- strongest `20` to `30` games tested on target devices
- app store support docs reviewed
- screenshots, onboarding, and metadata prepared
- production web deployment path verified

## Immediate Next Actions
1. Fix shared UI encoding in common components.
2. Build the remaining `Memory & Focus` games.
3. Build the remaining `Baby Co-Play` games.
4. Build the remaining `Letters & Reading` games.
5. Continue filling the remaining categories from [core-catalog-plan.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/core-catalog-plan.md).

## Change Control
Whenever a new game is built, merged, demoted to `Extra Play`, or reclassified:

- update [core-catalog-plan.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/core-catalog-plan.md)
- update [implementation-overview.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/implementation-overview.md)
- update [implementation-roadmap.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/implementation-roadmap.md) if priorities changed
