import { EventService } from "../../services/EventService";
import type { Event } from "../../types/Event";
import type { AppDispatch } from "../../types/Store";
import { updateFarmEventIds } from "./FarmActions";

export function loadEvents() {
  return async (dispatch: AppDispatch) => {
    try {
      const events: Event[] = await EventService.QueryAll();
      const action = { type: "SET_EVENTS", events };
      dispatch(action);
    } catch (err) {
      console.error("Error in loadEvents Action:", err);
      throw err;
    }
  };
}

export function addEvent(eventToAdd: Event, farmId: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const addedEvent = await EventService.Add(eventToAdd);
      const action = { type: "ADD_EVENT", addedEvent };
      dispatch(action);
      // Update the farm to include this event ID and persist to storage:
      dispatch(updateFarmEventIds(farmId, addedEvent.id));
    } catch (err) {
      console.error("Error in addEvent Action:", err);
      throw err;
    }
  };
}

export function updateEvent(eventToUpdate: Event) {
  return async (dispatch: AppDispatch) => {
    try {
      const updatedEvent = await EventService.Update(eventToUpdate);
      const action = { type: "UPDATE_EVENT", updatedEvent };
      dispatch(action);
    } catch (err) {
      console.error("Error in updateEvent Action:", err);
      throw err;
    }
  };
}

export function removeEvent(eventToRemoveId: Event["id"]) {
  return async (dispatch: AppDispatch) => {
    try {
      const removedEventId = await EventService.Remove(eventToRemoveId);
      const action = { type: "REMOVE_EVENT", removedEventId };
      dispatch(action);
    } catch (err) {
      console.error("Error in removeEvent Action:", err);
      throw err;
    }
  };
}
