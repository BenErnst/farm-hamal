import { createSelector } from 'reselect';
import type { RootState } from '../../types/Store';
import type { Event, EnrichedEvent } from '../../types/Event';
import type { Farm } from '../../types/Farm';


// Base selectors to get raw data from state
const selectEvents = (state: RootState) => state.eventModule.events;
const selectFarms = (state: RootState) => state.farmModule.farms;


// Helper function to enrich events with farm data
const enrichEventsWithFarmData = (events: Event[], farms: Farm[]): EnrichedEvent[] => {
    return events.map((event: Event): EnrichedEvent => {
        const farm = farms.find((farm: Farm) => farm.eventIds.includes(event.id));
        return {
            ...event,
            farmName: farm?.name || '',
        };
    });
};


// Memoized selector that returns enriched events (with farm data)
export const selectEnrichedEvents = createSelector(
    [selectEvents, selectFarms],
    (events, farms): EnrichedEvent[] => {
        return enrichEventsWithFarmData(events, farms);
    }
);