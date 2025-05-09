import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { EntityReducer } from './reducers/EntityReducer';

const rootReducer = combineReducers({
    entityModule: EntityReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

window.myStore = store;
