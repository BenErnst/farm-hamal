import { store } from '../store/index.ts';
import type { Entity } from './Entity.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GlobalState {
    entities: Entity[]
}

export type EntityAction = { type: 'ADD_ENTITY'; addedEntity: Entity }