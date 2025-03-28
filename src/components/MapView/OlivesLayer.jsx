import { Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const OlivesLayer = ({ olives }) => {
  const oliveIcon = new L.Icon({
    iconUrl: "/img/olive.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const [radius, setRadius] = useState(50);
  const [growing, setGrowing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prev) => {
        if (prev >= 80) {
          setGrowing(false);
          return prev - 1;
        }
        if (prev <= 40) {
          setGrowing(true);
          return prev + 1;
        }
        return growing ? prev + 1 : prev - 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [growing]);

  return (
    <>
      {olives.map((o, i) => {
        if (!o.location?.coordinates) return null;

        const [lng, lat] = o.location.coordinates;

        return (
          <div key={i}>
            <Marker position={[lat, lng]} icon={oliveIcon}>
              <Popup>Olive Marker</Popup>
            </Marker>
            <Circle
              center={[lat, lng]}
              radius={radius}
              pathOptions={{
                color: "#64dd17",
                fillColor: "#64dd17",
                fillOpacity: 0.2,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default OlivesLayer;
