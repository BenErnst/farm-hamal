import type { GlobalState, EntityAction } from "../../types/Store";


const INITIAL_STATE = {
    entities: [
        {
            id: 'b_123',
            fullname: 'Ben Ernst',
            isMale: true,
            team: 'MTA'
        }
    ]
} as GlobalState;


export function EntityReducer(state = INITIAL_STATE, action: EntityAction): GlobalState {

    switch (action.type) {

        case 'ADD_ENTITY':
            return {
                ...state,
                entities: [...state.entities, action.entityToAdd]
            };

        default:
            return state;
    }

}