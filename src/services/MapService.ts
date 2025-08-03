export class MapService {
    static map: google.maps.Map | null = null;

    static setMap(mapInstance: google.maps.Map) {
        this.map = mapInstance;
    }

    static zoomTo(location: { lng: number; lat: number; }) {
        if (this.map) {
            this.map.panTo(location);
            this.map.setZoom(17);
        }
    }
}