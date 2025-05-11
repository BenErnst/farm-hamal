import type { Entity } from "../../types/Entity";
import type { AppDispatch } from "../../types/Store";


export function addEntity(entityToAdd: Entity) {
    return async (dispatch: AppDispatch) => {
        try {
            const action = { type: 'ADD_ENTITY', entityToAdd };
            dispatch(action);
        } catch (err) {
            console.error('Error in addEntity Action:', err);
            throw err;
        }
    }
}
