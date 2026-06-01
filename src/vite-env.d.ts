/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_MAP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend Window interface for Redux store debugging
declare global {
  interface Window {
    myStore?: any; // Redux store for debugging
  }
}
