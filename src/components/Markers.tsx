import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../hooks/useStoreTypes";
import { updateEvent } from "../store/actions/EventActions";
import type { Event } from "../types/Event";
import type { Farm } from "../types/Farm";
import { MapService } from '../services/MapService';
import { Tooltip } from 'primereact/tooltip';


interface Props {
    entities: Farm[] | Event[]
    whichEntity: 'farm' | 'event'
}


export const Markers = (props: Props) => {
    const { entities, whichEntity } = props;
    const dispatch = useAppDispatch();
    const map = useMap();


    useEffect(() => {
        if (map) {
            MapService.setMap(map);
        }
    }, [map]);


    const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
        if (map && ev.latLng) {
            map.panTo(ev.latLng);
        }
    }, [map]);


    const handleDragEnd = useCallback((ev: google.maps.MapMouseEvent, entity: Farm | Event) => {
        if (map && ev.latLng) {
            const newMarkerLocation = ev.latLng.toJSON();
            const eventToUpdate = { ...entity, location: newMarkerLocation } as Event; // only event is draggable
            dispatch(updateEvent(eventToUpdate));
        }
    }, [map]);


    const getPinBackground = (entity: Farm | Event) => {
        const isPanding = (entity as Event)?.status === 'pending';
        const isInProgress = (entity as Event)?.status === 'inProgress';
        const isCompleted = (entity as Event)?.status === 'completed';
        return isPanding ? '#f87171' : isInProgress ? '#fb923c' : isCompleted ? '#4ade80' : '#8f8f8fff';
    };

    return entities.map(entity => (
        <AdvancedMarker
            key={entity.id}
            position={entity.location}
            clickable={true}
            onClick={handleClick}
            draggable={whichEntity === 'event'}
            onDragEnd={(ev) => handleDragEnd(ev, entity)}
        >
            <Pin
                background={getPinBackground(entity)}
                glyphColor={'#000'}
                borderColor={'#000'}
                scale={1.5}
            >
                <div>
                    {whichEntity === 'farm' ? (
                        <span style={{ fontSize: '18px' }}>
                            {(entity as Farm).emoji}
                        </span>
                    )
                        :
                        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
                            {entity.type}
                        </span>
                    }
                </div>
            </Pin>
        </AdvancedMarker>
    ))
}