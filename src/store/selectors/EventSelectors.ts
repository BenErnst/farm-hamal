import { createSelector } from 'reselect';
import type { RootState } from '../../types/Store';
import type { Event, EnrichedEvent } from '../../types/Event';
import type { EventFilterBy } from '../../types/Store';


/**
 * Base selectors to get raw data from state
 */
const selectEvents = (state: RootState) => state.eventModule.events;
const selectFarms = (state: RootState) => state.farmModule.farms;
const selectFilterBy = (state: RootState) => state.eventModule.filterBy;


/**
 * Helper function to enrich events with farm data
 */
const enrichEventsWithFarmData = (events: Event[], farms: any[]): EnrichedEvent[] => {
    return events.map((event: Event): EnrichedEvent => {
        const farm = farms.find((farm: any) => farm.eventIds?.includes(event.id));
        return {
            ...event,
            farmName: farm?.name || '',
        };
    });
};


/**
 * Helper function to apply filters to enriched events
 */
const applyFilters = (enrichedEvents: EnrichedEvent[], filterBy: EventFilterBy): EnrichedEvent[] => {
    return enrichedEvents.filter((event: EnrichedEvent) => {
        // Check each filter type - if filter has values, event must match at least one
        const filterChecks = [
            { filterValues: filterBy.type, eventValue: event.type },
            { filterValues: filterBy.status, eventValue: event.status },
            { filterValues: filterBy.farmName, eventValue: event.farmName },
        ];

        // All active filters must pass (AND logic)
        return filterChecks.every(({ filterValues, eventValue }) =>
            filterValues.length === 0 || filterValues.includes(eventValue)
        );
    });
};


/**
 * Memoized selector that returns enriched events (with farm data) without filtering
 * Now safe because farms are loaded before events
 */
export const selectEnrichedEvents = createSelector(
    [selectEvents, selectFarms],
    (events, farms): EnrichedEvent[] => {
        return enrichEventsWithFarmData(events, farms);
    }
);


/**
 * Memoized selector that returns filtered events based on current filterBy state
 * This is where the filtering logic happens - computed on-the-fly
 */
export const selectFilteredEvents = createSelector(
    [selectEnrichedEvents, selectFilterBy],
    (enrichedEvents, filterBy): EnrichedEvent[] => applyFilters(enrichedEvents, filterBy)
);


/**
 * Memoized selector that returns unique values for filter options
 */
export const selectEventFilterOptions = createSelector(
    [selectEnrichedEvents],
    (enrichedEvents: EnrichedEvent[]) => {
        // Generic function to extract unique values for any field:
        const getUniqueValues = (field: keyof EnrichedEvent): string[] => {
            const fieldValues = enrichedEvents.map((event: EnrichedEvent) => event[field] as string);
            return [...new Set(fieldValues)];
        }
        return {
            type: getUniqueValues('type'),
            status: getUniqueValues('status'),
            farmName: getUniqueValues('farmName'),
        };
    }
);