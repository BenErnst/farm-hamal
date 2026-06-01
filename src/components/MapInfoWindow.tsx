import { InfoWindow } from "@vis.gl/react-google-maps";
import type { InfoWindowType } from "./FarmMap";

interface Props {
  infoWindow: InfoWindowType;
  setInfoWindow: (infoWindow: InfoWindowType | null) => void;
}

export const MapInfoWindow = (props: Props) => {
  const { infoWindow, setInfoWindow } = props;

  return (
    <InfoWindow
      position={infoWindow.position}
      onCloseClick={() => setInfoWindow(null)}
    >
      {infoWindow.content}
    </InfoWindow>
  );
};
