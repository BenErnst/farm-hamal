import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { useAppSelector } from '../hooks/useStoreTypes';
import { Markers } from './Markers';


export const FarmMap = () => {
    const API_KEY = 'AIzaSyAv3a3BKdx2ggwqV9QTXx_BcegBYN4fYCg';
    const MAP_ID = 'b9d8e14e7c57084a79c4c8b6';
    const { farms } = useAppSelector(state => state.farmModule);
    const { events } = useAppSelector(state => state.eventModule);

    return (
        <div className="farm-map-container">
            <APIProvider apiKey={API_KEY} onLoad={() => { }}>
                {farms.length ? (
                    <Map
                        mapId={MAP_ID}
                        defaultZoom={8.5}
                        defaultCenter={{ lat: 32.22117, lng: 35.16566 }}
                        mapTypeId="hybrid"
                    >
                        <Markers entities={farms} whichEntity={'farm'} />
                        <Markers entities={events} whichEntity={'event'} />
                    </Map>
                ) : null}
            </APIProvider>
        </div>
    )
}