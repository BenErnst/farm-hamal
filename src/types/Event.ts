import type { Location } from "./Location"

export interface Event {
    id: string
    location: Location
    type: EventType
    status: EventStatus
    createdAt: number | null
    completedAt: number | null
}

type EventType =
    | 'fire' // שריפה
    | 'theft' // גניבה
    | 'fenceCut' // חיתוך גדר
    | 'protectionThreat' // איום בפרוטקשן
    | 'gunfire' // ירי
    | 'herdInvasion' // פלישת עדר


type EventStatus =
    | 'pending' // טרם טופל
    | 'inProgress' // בטיפול
    | 'completed' // טופל