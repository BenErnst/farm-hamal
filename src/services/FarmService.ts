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
    return await new Promise((resolve) => {
        let farmsJson = StorageService.load('farms') as string | null;
        if (!farmsJson) {
            const farms = getInitialFarms();
            StorageService.save('farms', farms);
            farmsJson = StorageService.load('farms') as string;
        }
        const allFarms = JSON.parse(farmsJson) as Farm[];
        resolve(allFarms);
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
            location: { lng: 35.40264, lat: 32.67867 },
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
            location: { lng: 35.18238, lat: 32.57660 },
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
            location: { lng: 35.26893, lat: 32.55460 },
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
            location: { lng: 34.91043, lat: 32.37877 },
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