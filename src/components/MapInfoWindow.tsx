import { InfoWindow } from "@vis.gl/react-google-maps"

interface Props {
    infoWindow: {
        position: {
            lat: number
            lng: number
        };
        content: string
    };
    setInfoWindow: (infoWindow: any) => void
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
    )
}