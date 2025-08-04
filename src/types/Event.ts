import type { Location } from "./Location"

export interface Event {
    id?: string
    location: Location
    type: EventType
    status: EventStatus
    createdAt: number | null
    updatedAt: number | null
}

type EventType =
    | 'שריפה' // fire
    | 'גניבה' // theft
    | 'חיתוך גדר' // fenceCut
    | 'פרוטקשן' // protectionThreat
    | 'פלישת עדר'; // herdInvasion

type EventStatus =
    | 'pending' // טרם טופל
    | 'inProgress' // בטיפול
    | 'completed' // טופל

export interface EnrichedEvent extends Event {
    farmName: string;
}