import type { Event } from "./event"
import type { Location } from "./Location"

export interface Farm {
    id: string
    name: string
    location: Location
    region: Region
    type: FarmType
    farmer: Farmer
    eventsIds: Event['id'][]
}

type Region =
    | 'north' // צפון
    | 'center' // מרכז
    | 'south' // דרום

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