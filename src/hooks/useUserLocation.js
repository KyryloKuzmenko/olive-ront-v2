import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          setUserLocation([50.4501, 30.5234]);
        }
      );
    } else {
      setUserLocation([50.4501, 30.5234]);
    }
  }, []);

  return userLocation;
};
