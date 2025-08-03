import type { GlobalFarmState } from "../../types/Store";


const INITIAL_STATE = {
    farms: []
} as GlobalFarmState;


export function FarmReducer(state = INITIAL_STATE, action: any): GlobalFarmState {

    switch (action.type) {

        case 'SET_FARMS':
            return {
                ...state,
                farms: [...action.farms]
            };

        case 'ADD_EVENT_TO_FARM':
            return {
                ...state,
                farms: state.farms.map(farm =>
                    farm.id === action.farmId
                        ? { ...farm, eventIds: [...farm.eventIds, action.eventId] }
                        : farm
                )
            };

        case 'UPDATE_FARM':
            return {
                ...state,
                farms: state.farms.map(farm =>
                    farm.id === action.updatedFarm.id
                        ? action.updatedFarm
                        : farm
                )
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