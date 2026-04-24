# Operations Runbook

## Purpose
This document covers the day-to-day engineering and release operations for the mobile project.

## Prerequisites
- Node and npm installed
- Expo CLI available through `npx`
- Expo Go or simulator for device testing

## Install
```bash
npm install
```

## Local Development
Start Expo:

```bash
npx expo start -c
```

Alternative scripts:

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Verification Commands
Lint:

```bash
npm run lint
```

Export web:

```bash
npx expo export -p web
```

Export Android test bundle:

```bash
npx expo export --platform android --output-dir dist-android-test
```

## GitHub Pages Deployment
Deploy the current web build:

```bash
npm run deploy
```

This runs:

1. `expo export -p web`
2. `gh-pages -d dist --nojekyll`

## Release Checklist
Before pushing a release-oriented change:

1. run `npm run lint`
2. export the web build
3. export the Android test bundle
4. smoke test parent flow and newest games in Expo Go
5. update implementation docs if catalog or priorities changed
6. deploy only after the above checks pass

## Game Review Workflow
For current product hardening, do not batch-change the whole catalog blindly.

Use this workflow:

1. review about `5` games at a time
2. inspect requirement fit, design, UX, technical quality, and obvious security risk
3. fix only the reviewed batch
4. verify with `npm run lint` and export checks as needed
5. device-test the same batch before moving on

## Layout Decision Rule
Do not standardize every game into one layout pattern.

Use shared layout pieces when they help, but let the mechanic drive the final screen structure. If a broader layout change is proposed across multiple games, document the recommendation and confirm before applying it widely.

## Documentation Maintenance Rule
When implementation changes affect product scope, status, or catalog structure:

- update [implementation-overview.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/implementation-overview.md)
- update [core-catalog-plan.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/core-catalog-plan.md)
- update [implementation-roadmap.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/implementation-roadmap.md)
- update [product-review.md](/C:/Users/shalk/kidsplayingapp/mobile-kids-learning/docs/product-review.md) only if the review conclusions change materially

## Temp And Generated Files
These should not be kept as working clutter in the repo folder:

- `.expo/`
- `dist/`
- `dist-android-test/`
- `dist-ios-test/`
- `expo-start.log`

They are ignored in `.gitignore` and can be safely regenerated.

## Current Operational Notes
- The project deploys web output to GitHub Pages.
- Local storage is fully client-side through AsyncStorage.
- There is no separate backend service in the current implementation.
