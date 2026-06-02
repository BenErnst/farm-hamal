# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check then build for production
npm run lint      # ESLint
npm run preview   # Preview the production build locally
npm run deploy    # Build + publish to GitHub Pages via gh-pages
```

There are no tests in this project.

## Environment Variables

The app requires a `.env` file at the root:

```
VITE_GOOGLE_MAPS_API_KEY=...
VITE_GOOGLE_MAPS_MAP_ID=...
```

`MapService` reads these at runtime. The map will not render without a valid API key.

## Architecture

**Stack:** React 19, TypeScript, Vite, Redux Toolkit, PrimeReact (lara-dark-blue theme), SCSS, React Hook Form + Zod, `@vis.gl/react-google-maps`, Chart.js via PrimeReact.

### Data layer — localStorage, no backend

There is no API server. `FarmService` and `EventService` simulate async operations over `localStorage` (via `StorageService`). On first load, each service seeds `localStorage` with hardcoded initial data if the key is missing. All CRUD operations read/write from `localStorage` and resolve a Promise.

`Farm` and `Event` are the two core entities. They are **loosely coupled**: a `Farm` holds an array of `eventIds`, and an `Event` holds a `location` but no `farmId`. The join is resolved at read time via `EventSelectors.selectEnrichedEvents` (reselect), which looks up the farm that contains each event's id.

When a new event is created (`addEvent` action), two things happen in sequence: the event is persisted and added to the Redux store, then `updateFarmEventIds` is dispatched to push the new event's id into the owning farm's `eventIds` array and persist that too.

### Redux store

Uses plain Redux Toolkit (`configureStore` + `combineReducers`) with hand-written action type strings — not `createSlice`. Actions are thunks that call services, then dispatch plain objects with string `type` fields (`'SET_EVENTS'`, `'ADD_EVENT'`, etc.). Reducers switch on those strings.

Two modules: `farmModule` and `eventModule`.

`store/index.ts` exposes the store on `window.myStore` in development for debugging.

### Hebrew labels

All user-facing strings are in Hebrew. `UtilService.he` is the single source of truth for all Hebrew labels (farm types, event types, event statuses). Always use `UtilService.he.*` when rendering these values — do not hardcode Hebrew strings inline.

Event and farm type values stored in localStorage **are the Hebrew strings** (e.g. `'שריפה'`, `'חוות בקר'`), not English keys.

### Map interaction

Clicking anywhere on the Google Map opens an `EventAdd` form inside a `MapInfoWindow` at the clicked coordinates. The form auto-selects the closest farm by Manhattan distance. Submitting creates a new event at that location and associates it with the selected farm.

`MapService` is a static class that holds a reference to the live `google.maps.Map` instance, used for programmatic pan/zoom from outside the map component.

### Styling

SCSS with a `global.scss` entry point that imports partials in order: `setup/_variables` → `basics/` → `components/`. Each component has a corresponding partial in `src/assets/style/components/`. PrimeReact theme is imported globally in `App.tsx`.

Never use `!important`. To override PrimeReact specificity, double the class selector (e.g. `.p-foo.p-foo`) or nest under a container class — both raise specificity without `!important`.
