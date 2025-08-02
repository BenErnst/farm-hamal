import { EventService } from "../../services/EventService";
import type { Event } from "../../types/event";
import type { AppDispatch } from "../../types/Store";


export function loadEvents() {
    return async (dispatch: AppDispatch) => {
        try {
            const events: Event[] = await EventService.getAll();
            const action = { type: 'SET_EVENTS', events };
            dispatch(action);
        } catch (err) {
            console.error('Error in loadEvents Action:', err);
            throw err;
        }
    }
}

// export function addEvent(eventToAdd: Event) {
//     return async (dispatch: AppDispatch) => {
//         try {
//             const action = { type: 'ADD_EVENT', eventToAdd };
//             dispatch(action);
//         } catch (err) {
//             console.error('Error in addEvent Action:', err);
//             throw err;
//         }
//     }
// }

export function updateEvent(eventToUpdate: Event) {
    return async (dispatch: AppDispatch) => {
        try {
            const updatedEvent = await EventService.Update(eventToUpdate);
            const action = { type: 'UPDATE_EVENT', updatedEvent };
            dispatch(action);
        } catch (err) {
            console.error('Error in updateEvent Action:', err);
            throw err;
        }
    }
}
