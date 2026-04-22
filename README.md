# Mobile Kids Learning App

This folder contains the React Native / Expo mobile port of the existing web app.

## Start

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm run start
```

Then open it in Expo Go or an emulator.

## Current port status

- Converted foundation: navigation, storage, settings, stickers, session timer
- Converted screens: home, animals, counting, settings, sticker book, dashboard
- Placeholder screens exist for games that still need native UI conversion

## Notes

- The web app remains untouched in `../kids-learning-mvp`
- Mobile storage uses AsyncStorage instead of `localStorage`
- Voice uses `expo-speech`
- Haptics use `expo-haptics`

## Project Docs

- `docs/implementation-overview.md`
- `docs/solution-architecture.md`
- `docs/core-catalog-plan.md`
- `docs/implementation-roadmap.md`
- `docs/operations-runbook.md`
- `docs/product-review.md`
