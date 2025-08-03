import { store } from '../store/index.ts';
import type { Event } from './Event.ts';
import type { Farm } from './Farm.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GlobalFarmState {
    farms: Farm[]
}

export interface EventFilterBy {
    type: string[];
    status: string[];
    farmName: string[];
}

export interface GlobalEventState {
    events: Event[],
    filterBy: EventFilterBy
}



// export type FarmAction = { type: 'ADD_FARM'; entityToAdd: Farm }
// export type EventAction = { type: 'ADD_EVENT'; entityToAdd: Event }