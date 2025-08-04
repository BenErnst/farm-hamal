import { store } from '../store/index.ts';
import type { Event } from './Event.ts';
import type { Farm } from './Farm.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GlobalFarmState {
    farms: Farm[]
}

export interface GlobalEventState {
    events: Event[]
}