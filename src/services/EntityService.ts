import type { Entity } from "../types/Entity";
import { StorageService } from "./StorageService";
import { UtilService } from "./UtilService";


export const EntityService = {
    Add
}


async function Add(entityToAdd: Entity): Promise<Entity> {
    const addedEntity = await new Promise((resolve) => {
        entityToAdd.id = `t_${UtilService.makeId()}`;
        const entities = getParsedEntities();
        entities.push(entityToAdd);
        StorageService.save('entities', entities);
        const addedEntity = entities.find(entity => entity.id === entityToAdd.id);
        resolve(addedEntity);
    });
    return addedEntity as Entity;
}


function getParsedEntities() {
    const entitiesJson = StorageService.load('entities') as string;
    const entities = JSON.parse(entitiesJson) as Entity[];
    return entities;
}