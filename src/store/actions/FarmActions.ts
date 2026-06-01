import { FarmService } from "../../services/FarmService";
import type { Event } from "../../types/Event";
import type { Farm } from "../../types/Farm";
import type { AppDispatch } from "../../types/Store";
import type { RootState } from "../../types/Store";

export function loadFarms() {
  return async (dispatch: AppDispatch) => {
    try {
      const farms: Farm[] = await FarmService.QueryAll();
      const action = { type: "SET_FARMS", farms };
      dispatch(action);
    } catch (err) {
      console.error("Error in loadFarms Action:", err);
      throw err;
    }
  };
}

export function updateFarmEventIds(farmId: string, eventId: Event["id"]) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const state = getState();
      const farm = state.farmModule.farms.find(
        (farm: Farm) => farm.id === farmId,
      );
      if (farm) {
        const farmToUpdate = {
          ...farm,
          eventIds: [...farm.eventIds, eventId],
        };
        const updatedFarm = await FarmService.Update(farmToUpdate);
        const action = { type: "UPDATE_FARM", updatedFarm };
        dispatch(action);
      }
    } catch (err) {
      console.error("Error in updateFarmEventIds Action:", err);
      throw err;
    }
  };
}
