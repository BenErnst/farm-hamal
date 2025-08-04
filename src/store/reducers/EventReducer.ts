import type { EventAction, GlobalEventState } from "../../types/Store";


const INITIAL_STATE: GlobalEventState = {
    events: []
};


export function EventReducer(state = INITIAL_STATE, action: EventAction): GlobalEventState {

    switch (action.type) {

        case 'SET_EVENTS':
            return {
                ...state,
                events: [...action.events]
            };

        case 'ADD_EVENT':
            return {
                ...state,
                events: [...state.events, action.addedEvent]
            };

        case 'UPDATE_EVENT':
            return {
                ...state,
                events: state.events.map(event => {
                    return event.id === action.updatedEvent.id ? action.updatedEvent : event;
                })
            }

        case 'REMOVE_EVENT':
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.removedEventId)
            };

        default:
            return state;
    }

}

