import type { Farm } from "../types/Farm";
import { StorageService } from "./StorageService";
import { UtilService } from "./UtilService";


export const FarmService = {
    QueryAll,
    // Add,
    Update,
    // Remove
}


const { he } = UtilService;


async function QueryAll(): Promise<Farm[]> {
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


async function Update(farmToUpdate: Farm): Promise<Farm> {
    return await new Promise((resolve) => {
        const farms = getParsedFarms();
        const farmToUpdateIdx = farms.findIndex(farm => farm.id === farmToUpdate.id);
        farms.splice(farmToUpdateIdx, 1, farmToUpdate);
        StorageService.save('farms', farms);
        const updatedFarm = farms.find(farm => farm.id === farmToUpdate.id) as Farm;
        resolve(updatedFarm);
    });
}


function getParsedFarms(): Farm[] {
    const farmsJson = StorageService.load('farms') as string;
    return JSON.parse(farmsJson) as Farm[];
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
            type: he.farmType.cattleFarm,
            farmer: {
                name: 'משה פילמן',
                phone: '052-*******',
                picURL: 'https://i.pravatar.cc/150?img=62'
            },
            eventIds: ['e_1', 'e_3'],
            emoji: '🐮'
        },
        {
            id: 'f_2',
            name: 'עגבניות מגידו',
            location: { lng: 35.18238, lat: 32.57660 },
            type: he.farmType.fieldCrops,
            farmer: {
                name: 'איציק לוין',
                phone: '054-*******',
                picURL: 'https://i.pravatar.cc/150?img=65'
            },
            eventIds: ['e_2'],
            emoji: '🍅'
        },
        {
            id: 'f_3',
            name: 'אבוקדו תענכים',
            location: { lng: 35.26893, lat: 32.55460 },
            type: he.farmType.fruitOrchard,
            farmer: {
                name: 'ירון שלמה',
                phone: '050-*******',
                picURL: 'https://i.pravatar.cc/150?img=17'
            },
            eventIds: [],
            emoji: '🥑'
        },
        {
            id: 'f_4',
            name: 'אורוות יזרעאל',
            location: { lng: 35.23117, lat: 32.66213 },
            type: he.farmType.horseStable,
            farmer: {
                name: 'ענת גרשוני',
                phone: '052-*******',
                picURL: 'https://i.pravatar.cc/150?img=47'
            },
            eventIds: [],
            emoji: '🐴'
        },
        {
            id: 'f_5',
            name: 'לול רמת ישי',
            location: { lng: 35.17770, lat: 32.70178 },
            type: he.farmType.chickenCoop,
            farmer: {
                name: 'שמעון כהן',
                phone: '052-*******',
                picURL: 'https://i.pravatar.cc/150?img=33'
            },
            eventIds: [],
            emoji: '🐔'
        },
        {
            id: 'f_6',
            name: 'עיזים נהלל',
            location: { lng: 35.19123, lat: 32.68921 },
            type: he.farmType.goatPen,
            farmer: {
                name: 'יפעת אלון',
                phone: '054-*******',
                picURL: 'https://i.pravatar.cc/150?img=29'
            },
            eventIds: [],
            emoji: '🐐'
        }
    ] as Farm[]
}