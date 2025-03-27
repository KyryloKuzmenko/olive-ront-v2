import { useMapEvents } from "react-leaflet";

const MapEventHandler = ({ onDoubleClick }) => {
    useMapEvents({
        dblclick: onDoubleClick,
    });
    return null;
};

export default MapEventHandler;