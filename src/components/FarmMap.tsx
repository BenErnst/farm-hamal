import { APIProvider, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps';
import { useAppSelector } from '../hooks/useStoreTypes';
import { Markers } from './Markers';
import { useEffect, useState } from 'react';
import { MapInfoWindow } from './MapInfoWindow';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { EventAdd } from './EventAdd';


export const FarmMap = () => {
    const API_KEY = 'AIzaSyAv3a3BKdx2ggwqV9QTXx_BcegBYN4fYCg';
    const MAP_ID = 'b9d8e14e7c57084a79c4c8b6';
    const { farms } = useAppSelector(state => state.farmModule);
    const { events } = useAppSelector(state => state.eventModule);
    const [infoWindow, setInfoWindow] = useState<any>(null);
    // const [isFormVisible, setIsFormVisible] = useState(false);
    // const [selectedPosition, setSelectedPosition] = useState<any>(null);


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


    // const showForm = () => {
    //     if (infoWindow?.position) {
    //         setSelectedPosition(infoWindow.position);
    //     }
    //     setIsFormVisible(true);
    //     setInfoWindow(null);
    // }


    return (
        <div className="farm-map-container">
            <APIProvider apiKey={API_KEY} onLoad={() => { }}>
                {farms.length ? (
                    <Map
                        mapId={MAP_ID}
                        defaultZoom={8.5}
                        defaultCenter={{ lat: 32.22117, lng: 35.16566 }}
                        mapTypeId="hybrid"
                        onClick={handleMapClick}
                    >
                        <Markers entities={farms} whichEntity={'farm'} />
                        <Markers entities={events} whichEntity={'event'} />
                        {infoWindow && <MapInfoWindow infoWindow={infoWindow} setInfoWindow={setInfoWindow} />}
                        {/* <Dialog
                            visible={isFormVisible}
                            onHide={() => setIsFormVisible(false)}
                            dismissableMask={true}
                        >
                            <div className="event-add-content">
                                <h3>{'הוסף אירוע חדש'}</h3>
                                {selectedPosition && JSON.stringify(selectedPosition)}
                            </div>
                        </Dialog> */}
                    </Map>
                ) : null}
            </APIProvider>
        </div>
    )
}