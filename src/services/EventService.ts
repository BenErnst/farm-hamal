import type { Event } from "../types/event";
import { StorageService } from "./StorageService";
import { UtilService } from "./UtilService";


export const EventService = {
    getAll,
    // Add,
    Update,
    // Remove
}


const { he } = UtilService;


async function getAll(): Promise<Event[]> {
    return await new Promise((resolve) => {
        let eventsJson = StorageService.load('events') as string | null;
        if (!eventsJson) {
            const events = getInitialEvents();
            StorageService.save('events', events);
            eventsJson = StorageService.load('events') as string;
        }
        const allEvents = JSON.parse(eventsJson) as Event[];
        resolve(allEvents);
    });
}


// async function Add(productToAdd: Product): Promise<Product> {
//     const res = new Promise((resolve) => {
//         productToAdd._id = `p_${Math.floor(Math.random() * 10000)}`
//         const products = getParsedProducts();
//         products.push(productToAdd);
//         StorageService.save('products', products);
//         const addedProduct = products.find(product => product._id === productToAdd._id);
//         resolve(addedProduct);
//     });
//     const addedProduct = await res as Product;
//     return addedProduct;
// }


async function Update(eventToUpdate: Event): Promise<Event> {
    return await new Promise((resolve) => {
        const events = getParsedEvents();
        const eventToUpdateIdx = events.findIndex(event => event.id === eventToUpdate.id);
        events.splice(eventToUpdateIdx, 1, eventToUpdate);
        StorageService.save('events', events);
        const updatedEvent = events.find(event => event.id === eventToUpdate.id) as Event;
        resolve(updatedEvent);
    });
}


// async function Remove(productToRemove: Product): Promise<Product['_id']> {
//     const res = new Promise((resolve) => {
//         const products = getParsedProducts();
//         const productToRemoveIdx = products.findIndex(product => product._id === productToRemove._id);
//         products.splice(productToRemoveIdx, 1);
//         StorageService.save('products', products);
//         resolve(productToRemove._id);
//     });
//     const removedProductId = await res as Product['_id'];
//     return removedProductId;
// }


function getParsedEvents() {
    const eventsJson = StorageService.load('events') as string;
    const events = JSON.parse(eventsJson) as Event[];
    return events;
}


function getInitialEvents() {
    return [
        {
            id: 'e_1',
            location: { lng: 35.40185993652345, lat: 32.67866168499153 },
            type: he.eventType.theft,
            status: he.eventStatus.pending,
            createdAt: 1751363442000,
            completedAt: null
        },
        {
            id: 'e_2',
            location: { lng: 35.18210124183654, lat: 32.57578817544346 },
            type: he.eventType.fenceCut,
            status: he.eventStatus.inProgress,
            createdAt: 1751709042000,
            completedAt: null
        },
        {
            id: 'e_3',
            location: { lng: 35.40483182411195, lat: 32.67987629098312 },
            type: he.eventType.gunfire,
            status: he.eventStatus.completed,
            createdAt: 1751795442000,
            completedAt: 1751802642000
        },
    ] as Event[]
}