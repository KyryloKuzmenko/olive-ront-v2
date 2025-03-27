import { Marker } from "react-leaflet";

const OlivesLayer = ({ olives }) => {
  return (
    <>
      {olives.map((o, i) => {
        if (!o.location?.coordinates) return null;
        const [lng, lat] = o.location.coordinates;
        return <Marker key={i} position={[lat, lng]} />;
      })}
    </>
  );
};

export default OlivesLayer;
