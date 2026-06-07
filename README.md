# TheWeather

TheWeather is a mobile weather app that helps users quickly check the weather in different places. Users can search for a city, use their current location, and save their favorite locations for quick access. They can also reorder or remove saved places. When there is no internet connection, the app shows clear feedback instead of failing silently. This makes it useful for users who often check the weather in more than one location

TheWeather is built with Expo and React Native. It uses Expo Router, so the app routes live inside `src/app`. Most of the app logic is separated by feature in `src/features`, while cross-cutting utilities and reusable infrastructure stay in `src/shared`. Each feature exposes its public functions and components through an `index.ts` file.

The app saves user data locally, uses device location for current-place weather, handles offline states, and connects to an external weather API for forecast data. It also includes tests for components, utilities, and domain logic.

## Tech Stack

- Expo SDK 56
- React Native
- Expo Router
- Expo Location
- AsyncStorage
- NetInfo
- Open-Meteo API
- Jest
- React Native Testing Library

## Project Structure

- `src/app`: file-based routing and screen entry points
- `src/features/location`: current-device location feature
- `src/features/locations`: saved locations feature, catalog, and related UI
- `src/features/settings`: settings, theming, and app preferences
- `src/features/weather`: weather domain logic and forecast rendering
- `src/shared/design`: reusable UI primitives and design patterns
- `src/shared/network`: connectivity-aware UI and network helpers
- `src/shared/storage`: persistence helpers
- `src/shared/haptics`: interaction feedback helpers
- `src/test`: shared test support utilities

Each feature or shared module has its own `index.ts` entry point. Other parts of the app import from those public surfaces instead of reaching into internal files directly.

## Getting Started

### Requirements

- Node.js 24.x (see `.nvmrc` — run `nvm use`)
- npm
- An Android emulator, iOS simulator, Expo Go, or an Expo development build

### Installation

```bash
npm install
```

### Run checks

```bash
npx expo-doctor
npm run lint-typecheck
npm test
```

### Start the app

```bash
npx expo start --clear
```

### Common commands

```bash
npm run lint
npm run lint-eslint
npm run lint-prettier
npm run lint-knip
npm run test:ci
npm run build
```

## Environment and External Services

This project currently does not require custom environment variables to run locally.

External services and platform integrations used by the app:

- Open-Meteo API for weather and forecast data
- Device location permissions through Expo Location
- Local persistence through AsyncStorage
- Network connectivity detection through NetInfo

## Architecture Notes

- All application code lives under `src`.
- Routing is kept inside `src/app` and separated from application logic.
- Feature logic is organized by domain rather than by technical layer.
- Common functionality is consumed through explicit modlet entry points (`index.ts`), not through deep root-level aliases or arbitrary relative imports.
- The codebase includes tests for components, utilities, and domain behaviors.
