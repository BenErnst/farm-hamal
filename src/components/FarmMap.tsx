import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState, type JSX } from "react";
import { useAppSelector } from "../hooks/useStoreTypes";
import { EventAdd } from "./EventAdd";
import { MapInfoWindow } from "./MapInfoWindow";
import { Markers } from "./Markers";
import { MapService } from "../services/MapService";

export interface InfoWindowType {
  position: { lat: number; lng: number };
  content: JSX.Element;
}

export const FarmMap = () => {
  const { farms } = useAppSelector((state) => state.farmModule);
  const { events } = useAppSelector((state) => state.eventModule);
  const [infoWindow, setInfoWindow] = useState<InfoWindowType | null>(null);
  const API_KEY = MapService.API_KEY;
  const MAP_ID = MapService.MAP_ID;

  const handleMapClick = (ev: any) => {
    const selectedLocation = {
      lat: ev.detail.latLng.lat,
      lng: ev.detail.latLng.lng,
    };
    setInfoWindow({
      position: selectedLocation,
      content: (
        <EventAdd
          selectedLocation={selectedLocation}
          setInfoWindow={setInfoWindow}
        />
      ),
    });
  };

  return (
    <div className="farm-map-container">
      <APIProvider apiKey={API_KEY}>
        {farms.length && events.length ? (
          <Map
            mapId={MAP_ID}
            defaultZoom={10}
            defaultCenter={{ lng: 35.2861, lat: 32.63586 }}
            mapTypeId="terrain"
            onClick={handleMapClick}
          >
            <Markers entities={farms} whichEntity={"farm"} />
            <Markers entities={events} whichEntity={"event"} />
            {infoWindow && (
              <MapInfoWindow
                infoWindow={infoWindow}
                setInfoWindow={setInfoWindow}
              />
            )}
          </Map>
        ) : null}
      </APIProvider>
    </div>
  );
};
