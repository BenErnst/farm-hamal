import { FarmService } from "../../services/FarmService";
import type { Farm } from "../../types/farm";
import type { AppDispatch } from "../../types/Store";


export function loadFarms() {
    return async (dispatch: AppDispatch) => {
        try {
            const farms: Farm[] = await FarmService.getAll();
            const action = { type: 'SET_FARMS', farms };
            dispatch(action);
        } catch (err) {
            console.error('Error in loadFarms Action:', err);
            throw err;
        }
    }
}

// export function addFarm(farmToAdd: Farm) {
//     return async (dispatch: AppDispatch) => {
//         try {
//             const action = { type: 'ADD_FARM', farmToAdd };
//             dispatch(action);
//         } catch (err) {
//             console.error('Error in addFarm Action:', err);
//             throw err;
//         }
//     }
// }
