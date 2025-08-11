import { store } from '../store/index.ts';
import type { Event } from './Event.ts';
import type { Farm } from './Farm.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// FARM:

export interface GlobalFarmState {
    farms: Farm[]
}

export type FarmAction = SetFarmsAction | UpdateFarmAction;

interface SetFarmsAction {
    type: 'SET_FARMS';
    farms: Farm[];
}

interface UpdateFarmAction {
    type: 'UPDATE_FARM';
    updatedFarm: Farm;
}

// EVENT:

export interface GlobalEventState {
    events: Event[]
}

interface SetEventsAction {
    type: 'SET_EVENTS';
    events: Event[];
}

interface AddEventAction {
    type: 'ADD_EVENT';
    addedEvent: Event;
}

export interface UpdateEventAction {
    type: 'UPDATE_EVENT';
    updatedEvent: Event;
}

interface RemoveEventAction {
    type: 'REMOVE_EVENT';
    removedEventId: string;
}

export type EventAction = SetEventsAction | AddEventAction | UpdateEventAction | RemoveEventAction;