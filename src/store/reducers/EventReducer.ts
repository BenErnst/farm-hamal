import type { GlobalEventState } from "../../types/Store";


const INITIAL_STATE = {
    events: []
} as GlobalEventState;


export function EventReducer(state = INITIAL_STATE, action): GlobalEventState {

    switch (action.type) {

        case 'SET_EVENTS':
            return {
                ...state,
                events: [...action.events]
            };

        // case 'ADD_EVENT':
        //     return {
        //         ...state,
        //         events: [...state.events, action.eventToAdd]
        //     };

        case 'UPDATE_EVENT':
            return {
                ...state,
                events: state.events.map(event => {
                    return event.id === action.updatedEvent.id ? action.updatedEvent : event;
                })
            }

        default:
            return state;
    }

}