import type { Event } from "../types/event";
import { StorageService } from "./StorageService";
import { UtilService } from "./UtilService";


export const EventService = {
    getAll,
    // Add,
    // Edit,
    // Remove
}


const { he } = UtilService;


async function getAll(): Promise<Event[]> {
    const res = new Promise((resolve) => {
        let eventsJson = StorageService.load('events') as string | null;
        if (!eventsJson) {
            const events = getInitialEvents();
            StorageService.save('events', events);
            eventsJson = StorageService.load('events') as string;
        }
        resolve(JSON.parse(eventsJson));
    });
    const allEvents = await res as Event[];
    return allEvents;
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


// async function Edit(productToEdit: Product): Promise<Product> {
//     const res = new Promise((resolve) => {
//         const products = getParsedProducts();
//         const productToEditIdx = products.findIndex(product => product._id === productToEdit._id);
//         products.splice(productToEditIdx, 1, productToEdit);
//         StorageService.save('products', products);
//         const editedProduct = products.find(product => product._id === productToEdit._id);
//         resolve(editedProduct);
//     });
//     const editedProduct = await res as Product;
//     return editedProduct;
// }


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


// function getParsedProducts() {
//     const productsJson = StorageService.load('products') as string;
//     const products = JSON.parse(productsJson) as Product[];
//     return products;
// }


function getInitialEvents() {
    return [
        {
            id: 'e_1',
            location: { latitude: 32.68217, longitude: 35.39980 },
            type: he.eventType.theft,
            status: he.eventStatus.pending,
            createdAt: 1751363442000,
            completedAt: null
        },
        {
            id: 'e_2',
            location: { latitude: 32.61884, longitude: 35.21226 },
            type: he.eventType.fenceCut,
            status: he.eventStatus.inProgress,
            createdAt: 1751709042000,
            completedAt: null
        },
        {
            id: 'e_3',
            location: { latitude: 32.68217, longitude: 35.39980 },
            type: he.eventType.gunfire,
            status: he.eventStatus.completed,
            createdAt: 1751795442000,
            completedAt: 1751802642000
        },
    ] as Event[]
}