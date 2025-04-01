import { Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import { oliveIcon } from "../../utils/mapIcons";

const OlivesLayer = ({ olives }) => {
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

        const time = new Date(o.createdAt).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, //
        });

        return (
          <div key={i}>
            <Marker
              position={[lat, lng]}
              icon={oliveIcon}
              eventHandlers={{
                click: (e) => {
                  e.target.openPopup();
                },
              }}
            >
              <Popup>
                Olive added at
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;🕒{time}
              </Popup>
            </Marker>
            <Circle
              center={[lat, lng]}
              radius={radius}
              pathOptions={{
                color: "red",
                weight: 1,
                fillColor: "red",
                fillOpacity: 0.5,
              }}
            />
            <Circle
              center={[lat, lng]}
              radius={200}
              pathOptions={{
                color: "red",
                weight: 0,
                fillColor: "red",
                fillOpacity: 0.3,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default OlivesLayer;
