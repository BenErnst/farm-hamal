import type { GlobalFarmState } from "../../types/Store";


const INITIAL_STATE = {
    farms: []
} as GlobalFarmState;


export function FarmReducer(state = INITIAL_STATE, action): GlobalFarmState {

    switch (action.type) {

        case 'SET_FARMS':
            return {
                ...state,
                farms: [...action.farms]
            };

        // case 'ADD_FARM':
        //     return {
        //         ...state,
        //         farms: [...state.farms, action.farmToAdd]
        //     };

        default:
            return state;
    }

}