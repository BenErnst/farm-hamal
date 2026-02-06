import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FarmReducer } from './reducers/FarmReducer';
import { EventReducer } from './reducers/EventReducer';

const rootReducer = combineReducers({
    farmModule: FarmReducer,
    eventModule: EventReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

// Expose store to window for debugging (development only)
if (import.meta.env.DEV) {
    (window as any).myStore = store;
}
