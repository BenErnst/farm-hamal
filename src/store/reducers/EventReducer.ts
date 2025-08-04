import type { Event } from "../../types/Event";
import type { GlobalEventState } from "../../types/Store";


const INITIAL_STATE: GlobalEventState = {
    events: [],
    // filterBy: {
    //     type: [],
    //     status: [],
    //     farmName: []
    // }
};


export function EventReducer(state = INITIAL_STATE, action: any): GlobalEventState {

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
                events: mapEvents(state.events, action)
            }

        case 'REMOVE_EVENT':
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.removedEventId)
            };

        case 'SET_EVENT_FILTER_BY':
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            };

        case 'CLEAR_EVENT_FILTER_BY':
            return {
                ...state,
                filterBy: INITIAL_STATE.filterBy
            };

        default:
            return state;
    }

}


function mapEvents(events: Event[], action: any) {
    return events.map(event => {
        return event.id === action.updatedEvent.id ? action.updatedEvent : event;
    });
}