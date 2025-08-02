import { MarkerClusterer, type Marker } from "@googlemaps/markerclusterer";
import { useEffect, type RefObject } from "react";
import type { MarkersMap } from "../types/MarkersMap";


export const useMarkerCluster = (
    map: google.maps.Map | null,
    markersMap: MarkersMap,
    setMarkersMap: (markersMap: MarkersMap) => void,
    clusterer: RefObject<MarkerClusterer | null>
) => {

    // Initialize MarkerClusterer, if the map has changed
    useEffect(() => {
        if (map && !clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);


    // Update markers, if the markers array has changed
    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markersMap));
    }, [markersMap]);


    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markersMap[key]) {
            return;
        };
        if (!marker && !markersMap[key]) {
            return;
        };
        setMarkersMap(prev => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };


    return { setMarkerRef };
}