import type { GlobalEventState } from "../../types/Store";


const INITIAL_STATE = {
    events: []
} as GlobalEventState;


export function EventReducer(state = INITIAL_STATE, action): GlobalEventState {

    switch (action.type) {

        // case 'ADD_EVENT':
        //     return {
        //         ...state,
        //         events: [...state.events, action.eventToAdd]
        //     };

        default:
            return state;
    }

}