
const he = {
    farmType: {
        cattleFarm: 'חוות בקר',
        fruitOrchard: 'מטע פרי',
        fieldCrops: 'גידולי שדה',
        goatPen: 'דיר עיזים',
        horseStable: 'אורוות סוסים',
        chickenCoop: 'לול',
    },
    farmRegion: {
        north: 'צפון',
        center: 'מרכז',
        south: 'דרום'
    },
    eventType: {
        fire: 'שריפה',
        theft: 'גניבה',
        fenceCut: 'חיתוך גדר',
        protectionThreat: 'איום בפרוטקשן',
        gunfire: 'ירי',
        herdInvasion: 'פלישת עדר',
    },
    eventStatus: {
        pending: 'טרם טופל',
        inProgress: 'בטיפול',
        completed: 'טופל'
    }
};

export const UtilService = {
    // makeId,
    he,
}

// function makeId(length = 7) {
//     let id = "";
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for (var i = 0; i < length; i++) {
//         id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
// }

