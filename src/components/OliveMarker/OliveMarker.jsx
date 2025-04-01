import { useEffect, useState, useRef } from "react";
import { Marker, Circle } from "react-leaflet";
import { oliveIcon } from "../../utils/mapIcons";

const OliveMarker = ({ lat, lng, createdAt }) => {
  const [radius, setRadius] = useState(30); // Начинаем с минимума
  const growingRef = useRef(true); // Направление пульсации (растёт/сжимается)

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prev) => {
        if (prev >= 80) {
          growingRef.current = false;
          return prev - 1;
        }
        if (prev <= 30) {
          growingRef.current = true;
          return prev + 1;
        }
        return growingRef.current ? prev + 1 : prev - 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []); // Пустой массив зависимостей — эффект сработает один раз

  const time = new Date(createdAt).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      <Marker
        position={[lat, lng]}
        icon={oliveIcon}
        eventHandlers={{
          click: (e) => {
            const popup = L.popup()
              .setLatLng([lat, lng])
              .setContent(`Olive added at<br /> &emsp;🕒 ${time}`)
              .openOn(e.target._map);
          },
        }}
      />
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
    </>
  );
};

export default OliveMarker;
