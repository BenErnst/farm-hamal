export class MapService {
    static map: google.maps.Map | null = null;
    static API_KEY = 'AIzaSyAv3a3BKdx2ggwqV9QTXx_BcegBYN4fYCg';
    static MAP_ID = 'b9d8e14e7c57084a79c4c8b6';

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