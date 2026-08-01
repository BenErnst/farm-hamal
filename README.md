# Farm Hamal (חמ"ל חקלאים)

A situation-room dashboard for monitoring security incidents across a network of farms — fires, thefts, fence cuts, herd invasions, and extortion attempts — plotted live on a map. Built as a client-only React app with no backend; all data is seeded into and persisted through `localStorage`.

🔗 **Live demo:** [benernst.github.io/farm-hamal](https://benernst.github.io/farm-hamal/)

## Features

- **Interactive map** (Google Maps) showing every farm and every reported event, with marker clustering.
- **Report an event** by clicking anywhere on the map — a form opens at that exact location and auto-selects the nearest farm.
- **Farm list** and **event table** views for browsing and managing records directly.
- **Dashboard** with a live chart breaking down events by type.
- Fully **Hebrew UI**, right-to-left.

## Tech stack

- [React 19](https://react.dev/) + TypeScript + [Vite](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) (hand-written actions/reducers, thunks over async services)
- [PrimeReact](https://primereact.org/) (lara-dark-blue theme) + SCSS
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form validation
- [`@vis.gl/react-google-maps`](https://visgl.github.io/react-google-maps/) for the map
- [Chart.js](https://www.chartjs.org/) (via PrimeReact) for the dashboard chart

## Getting started

### Prerequisites

You'll need a Google Maps API key and a Map ID. Create a `.env` file at the project root:

```
VITE_GOOGLE_MAPS_API_KEY=your-api-key
VITE_GOOGLE_MAPS_MAP_ID=your-map-id
```

The map will not render without a valid key.

### Install & run

```bash
npm install
npm run dev       # start the dev server (Vite HMR)
```

### Other scripts

```bash
npm run build     # type-check, then build for production
npm run lint       # run ESLint
npm run preview   # preview the production build locally
npm run deploy    # build and publish to GitHub Pages via gh-pages
```

There are no automated tests in this project.

## Architecture notes

- **No backend.** `FarmService` and `EventService` simulate async CRUD over `localStorage` (via `StorageService`), seeding hardcoded initial data on first load.
- **Loosely coupled entities.** A `Farm` holds an array of `eventIds`; an `Event` holds a `location` but no `farmId`. The join happens at read time via a reselect selector that matches each event back to its owning farm.
- **Redux**, but not `createSlice` — plain `configureStore` + `combineReducers`, hand-written action type strings, and thunks that call services before dispatching.
- **Hebrew labels** (farm types, event types, statuses) live in one place, `UtilService.he`, and are also the actual values persisted in `localStorage`.

See [CLAUDE.md](./CLAUDE.md) for the full architecture writeup.
