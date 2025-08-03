import type { Event } from "./Event"
import type { Location } from "./Location"

export interface Farm {
    id: string
    name: string
    location: Location
    type: FarmType
    farmer: Farmer
    eventIds: Event['id'][]
    emoji: string
}

type FarmType =
    | 'cattleFarm' // חוות בקר
    | 'fruitOrchard' // מטע פרי
    | 'fieldCrops' // גידולי שדה
    | 'goatPen' // דיר עיזים
    | 'horseStable' // אורוות סוסים
    | 'chickenCoop' // לול


interface Farmer {
    name: string
    phone: string
    picURL: string
}