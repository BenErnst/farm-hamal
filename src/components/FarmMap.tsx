import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { useAppSelector } from '../hooks/useStoreTypes';
import { EventAdd } from './EventAdd';
import { MapInfoWindow } from './MapInfoWindow';
import { Markers } from './Markers';


export const FarmMap = () => {
    const API_KEY = 'AIzaSyAv3a3BKdx2ggwqV9QTXx_BcegBYN4fYCg';
    const MAP_ID = 'b9d8e14e7c57084a79c4c8b6';
    const { farms } = useAppSelector(state => state.farmModule);
    const { events } = useAppSelector(state => state.eventModule);
    const [infoWindow, setInfoWindow] = useState<any>(null);


    const handleMapClick = (ev: any) => {
        const selectedLocation = {
            lat: ev.detail.latLng.lat,
            lng: ev.detail.latLng.lng
        };
        setInfoWindow({
            position: selectedLocation,
            content: <EventAdd
                selectedLocation={selectedLocation}
                setInfoWindow={setInfoWindow}
            />
        });
    }


    return (
        <div className="farm-map-container">
            <APIProvider apiKey={API_KEY} onLoad={() => { }}>
                {farms.length ? (
                    <Map
                        mapId={MAP_ID}
                        defaultZoom={10}
                        defaultCenter={{ lng: 35.28610, lat: 32.63586 }}
                        mapTypeId="terrain"
                        onClick={handleMapClick}
                    >
                        <Markers entities={farms} whichEntity={'farm'} />
                        <Markers entities={events} whichEntity={'event'} />
                        {infoWindow && <MapInfoWindow infoWindow={infoWindow} setInfoWindow={setInfoWindow} />}
                    </Map>
                ) : null}
            </APIProvider>
        </div>
    )
}