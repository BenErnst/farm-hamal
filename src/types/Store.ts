import { store } from '../store/index.ts';
import type { Event } from './event.ts';
import type { Farm } from './farm.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GlobalFarmState {
    farms: Farm[]
}

export interface GlobalEventState {
    events: Event[]
}



// export type FarmAction = { type: 'ADD_FARM'; entityToAdd: Farm }
// export type EventAction = { type: 'ADD_EVENT'; entityToAdd: Event }