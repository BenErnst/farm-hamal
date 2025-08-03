import type { Location } from "./Location"

export interface Event {
    id?: string
    location: Location
    type: EventType
    status: EventStatus
    createdAt: number | null
    completedAt: number | null
}

type EventType =
    | 'שריפה' // fire
    | 'גניבה' // theft
    | 'חיתוך גדר' // fenceCut
    | 'פרוטקשן' // protectionThreat
    | 'ירי' // gunfire
    | 'פלישת עדר'; // herdInvasion

type EventStatus =
    | 'pending' // טרם טופל
    | 'inProgress' // בטיפול
    | 'completed' // טופל

export interface EnrichedEvent extends Event {
    farmName: string;
}