import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useRef, useState } from "react";
import { useMarkerCluster } from "../hooks/useMarkerCluster";
import type { Event } from "../types/event";
import type { Farm } from "../types/farm";
import type { MarkersMap } from "../types/MarkersMap";
import { useAppDispatch } from "../hooks/useStoreTypes";
import { updateEvent } from "../store/actions/EventActions";


interface Props {
    entities: Farm[] | Event[]
    whichEntity: 'farm' | 'event'
}


export const Markers = (props: Props) => {
    const { entities, whichEntity } = props;
    const dispatch = useAppDispatch();
    const map = useMap();
    const clusterer = useRef<MarkerClusterer | null>(null);
    const [markersMap, setMarkersMap] = useState<MarkersMap>({});
    const { setMarkerRef } = useMarkerCluster(map, markersMap, setMarkersMap, clusterer);


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


    return entities.map(entity => (
        <AdvancedMarker
            key={entity.id}
            position={entity.location}
            ref={marker => setMarkerRef(marker, entity.id)}
            clickable={true}
            onClick={handleClick}
            draggable={whichEntity === 'event'}
            onDragEnd={(ev) => handleDragEnd(ev, entity)}
        >
            <Pin
                background={whichEntity === 'event' ? '#fb7304ff' : '#0477fbff'}
                glyphColor={'#000'}
                borderColor={'#000'}
            />
        </AdvancedMarker>
    ))
}