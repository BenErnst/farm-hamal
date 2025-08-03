
const he = {
    farmType: {
        cattleFarm: 'חוות בקר',
        fruitOrchard: 'מטע פרי',
        fieldCrops: 'גידולי שדה',
        goatPen: 'דיר עיזים',
        horseStable: 'אורוות סוסים',
        chickenCoop: 'לול',
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


const statusSeverityMap = {
    pending: 'danger',
    inProgress: 'warning',
    completed: 'success'
}


export const UtilService = {
    // makeId,
    he,
    statusSeverityMap
}


// function makeId(length = 7) {
//     let id = "";
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for (var i = 0; i < length; i++) {
//         id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
// }

