import type { Farm } from "../types/farm";
import { StorageService } from "./StorageService";
import { UtilService } from "./UtilService";


export const FarmService = {
    getAll,
    // Add,
    // Edit,
    // Remove
}


const { he } = UtilService;


async function getAll(): Promise<Farm[]> {
    const res = new Promise((resolve) => {
        let farmsJson = StorageService.load('farms') as string | null;
        if (!farmsJson) {
            const farms = getInitialFarms();
            StorageService.save('farms', farms);
            farmsJson = StorageService.load('farms') as string;
        }
        resolve(JSON.parse(farmsJson));
    });
    const allFarms = await res as Farm[];
    return allFarms;
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


function getInitialFarms() {
    return [
        {
            id: 'f_1',
            name: 'בוקרי התבור',
            location: { latitude: 32.68217, longitude: 35.39980 },
            region: he.farmRegion.north,
            type: he.farmType.cattleFarm,
            farmer: {
                name: 'משה פילמן',
                phone: '052-*******',
                picURL: ''
            },
            eventsIds: ['e_1', 'e_3']
        },
        {
            id: 'f_2',
            name: 'עגבניות מגידו',
            location: { latitude: 32.61884, longitude: 35.21226 },
            region: he.farmRegion.north,
            type: he.farmType.fieldCrops,
            farmer: {
                name: 'איציק לוין',
                phone: '054-*******',
                picURL: ''
            },
            eventsIds: ['e_2']
        },
        {
            id: 'f_3',
            name: 'אבוקדו תענכים',
            location: { latitude: 32.56590, longitude: 35.28542 },
            region: he.farmRegion.north,
            type: he.farmType.fruitOrchard,
            farmer: {
                name: 'ירון שלמה',
                phone: '050-*******',
                picURL: ''
            },
            eventsIds: []
        },
        {
            id: 'f_4',
            name: 'אורוות השרון',
            location: { latitude: 32.35561, longitude: 34.92080 },
            region: he.farmRegion.center,
            type: he.farmType.horseStable,
            farmer: {
                name: 'ענת גרשוני',
                phone: '052-*******',
                picURL: ''
            },
            eventsIds: []
        },
    ] as Farm[]
}