import type { Store } from "redux";
import type { RootState } from "./Store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof import("redux").compose;
    myStore?: Store<RootState>;
  }
}

export {};
