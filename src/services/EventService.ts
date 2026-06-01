import type { Event } from "../types/Event";
import { StorageService } from "./StorageService";
import { UtilService } from "./UtilService";

export const EventService = {
  QueryAll,
  Add,
  Update,
  Remove,
};

const { he, makeId } = UtilService;

async function QueryAll(): Promise<Event[]> {
  return await new Promise((resolve) => {
    let eventsJson = StorageService.load("events") as string | null;
    if (!eventsJson) {
      const events = getInitialEvents();
      StorageService.save("events", events);
      eventsJson = StorageService.load("events") as string;
    }
    const allEvents = JSON.parse(eventsJson) as Event[];
    resolve(allEvents);
  });
}

async function Add(eventToAdd: Event): Promise<Event> {
  return await new Promise((resolve) => {
    const newEvent: Event = {
      ...eventToAdd,
      id: `e_${makeId()} `,
    };
    const events = getParsedEvents();
    events.push(newEvent);
    StorageService.save("events", events);
    resolve(newEvent);
  });
}

async function Update(eventToUpdate: Event): Promise<Event> {
  return await new Promise((resolve) => {
    const events = getParsedEvents();
    const eventToUpdateIdx = events.findIndex(
      (event) => event.id === eventToUpdate.id,
    );
    events.splice(eventToUpdateIdx, 1, eventToUpdate);
    StorageService.save("events", events);
    const updatedEvent = events.find(
      (event) => event.id === eventToUpdate.id,
    ) as Event;
    resolve(updatedEvent);
  });
}

async function Remove(eventToRemoveId: Event["id"]): Promise<Event["id"]> {
  return await new Promise((resolve) => {
    const events = getParsedEvents();
    const eventToRemoveIdx = events.findIndex(
      (event) => event.id === eventToRemoveId,
    );
    events.splice(eventToRemoveIdx, 1);
    StorageService.save("events", events);
    resolve(eventToRemoveId);
  });
}

function getParsedEvents() {
  const eventsJson = StorageService.load("events") as string;
  const events = JSON.parse(eventsJson) as Event[];
  return events;
}

function getInitialEvents() {
  return [
    {
      id: "e_1",
      location: { lng: 35.40185993652345, lat: 32.67866168499153 },
      type: he.eventType.theft,
      status: "pending",
      createdAt: 1751363442000,
      updatedAt: 1751363442000,
    },
    {
      id: "e_2",
      location: { lng: 35.18210124183654, lat: 32.57578817544346 },
      type: he.eventType.fenceCut,
      status: "inProgress",
      createdAt: 1751709042000,
      updatedAt: 1751709042000,
    },
    {
      id: "e_3",
      location: { lng: 35.40483182411195, lat: 32.67987629098312 },
      type: he.eventType.herdInvasion,
      status: "completed",
      createdAt: 1751795442000,
      updatedAt: 1751795442000,
    },
    {
      id: "e_4",
      location: { lng: 35.26927152998542, lat: 32.553101777923814 },
      type: he.eventType.theft,
      status: "pending",
      createdAt: 1751881842000,
      updatedAt: 1751881842000,
    },
    {
      id: "e_5",
      location: { lng: 35.189602327935525, lat: 32.68968733364655 },
      type: he.eventType.fenceCut,
      status: "inProgress",
      createdAt: 1751968242000,
      updatedAt: 1751968242000,
    },
    {
      id: "e_6",
      location: { lng: 35.3535502482119, lat: 32.535911641598894 },
      type: he.eventType.fire,
      status: "pending",
      createdAt: 1752054642000,
      updatedAt: 1752054642000,
    },
    {
      id: "e_7",
      location: { lng: 35.49727799780463, lat: 32.608221605736716 },
      type: he.eventType.herdInvasion,
      status: "pending",
      createdAt: 1752141042000,
      updatedAt: 1752141042000,
    },
    {
      id: "e_8",
      location: { lng: 35.485832014672575, lat: 32.74667452073306 },
      type: he.eventType.herdInvasion,
      status: "inProgress",
      createdAt: 1752227442000,
      updatedAt: 1752227442000,
    },
    {
      id: "e_9",
      location: { lng: 35.43310225016505, lat: 32.50963967482728 },
      type: he.eventType.theft,
      status: "inProgress",
      createdAt: 1752313842000,
      updatedAt: 1752313842000,
    },
    {
      id: "e_10",
      location: { lng: 35.1058087765503, lat: 32.5894634608399 },
      type: he.eventType.protectionThreat,
      status: "pending",
      createdAt: 1752400242000,
      updatedAt: 1752400242000,
    },
    {
      id: "e_11",
      location: { lng: 35.282840074462875, lat: 32.739701474296794 },
      type: he.eventType.fire,
      status: "completed",
      createdAt: 1752486642000,
      updatedAt: 1752486642000,
    },
  ] as Event[];
}
