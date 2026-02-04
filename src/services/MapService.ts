export class MapService {
    static map: google.maps.Map | null = null;
    static API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
    static MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'b9d8e14e7c57084a79c4c8b6';

    static setMap(mapInstance: google.maps.Map) {
        this.map = mapInstance;
    }

    static zoomTo(location: { lng: number; lat: number; }) {
        if (this.map) {
            this.map.panTo(location);
            this.map.setZoom(15);
        }
    }
}