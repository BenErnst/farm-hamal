import type { FarmAction, GlobalFarmState } from "../../types/Store";


const INITIAL_STATE = {
    farms: []
} as GlobalFarmState;


export function FarmReducer(state = INITIAL_STATE, action: FarmAction): GlobalFarmState {

    switch (action.type) {

        case 'SET_FARMS':
            return {
                ...state,
                farms: [...action.farms]
            };

        case 'UPDATE_FARM':
            return {
                ...state,
                farms: state.farms.map(farm => {
                    return farm.id === action.updatedFarm.id ? action.updatedFarm : farm;
                })
            };

        default:
            return state;
    }

}