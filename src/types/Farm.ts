import type { Event } from "./event"

export interface Farm {
    id: string
    name: string
    location: Location
    type: FarmType
    farmer: Farmer
    eventsIds: Event['id'][]
}

interface Location {
    latitude: number
    longitude: number
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