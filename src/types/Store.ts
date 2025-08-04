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