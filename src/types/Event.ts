export interface Event {
    id: string
    location: Location
    type: EventType
    status: EventStatus
    createdAt: number
    completedAt: number
}

type EventType =
    | 'fire' // שריפה
    | 'theft' // גניבה
    | 'fenceCut' // חיתוך גדר
    | 'protectionThreat' // איום בפרוטקשן
    | 'gunfire' // ירי
    | 'herdInvasion' // פלישת עדר


type EventStatus =
    | 'טרם טופל' // Pending
    | 'בטיפול' // InProgress
    | 'טופל' // Completed