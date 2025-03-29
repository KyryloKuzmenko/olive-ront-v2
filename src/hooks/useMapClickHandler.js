import { useCallback } from "react";

import { addOlive } from "../services/api";
import { isPointInAllowedRegion } from "../utils/geoHelper";

export const useMapClickHandler = (navigate, mapRef, setOlives) => {
  return useCallback(
    async (e) => {
      const { lat, lng } = e.latlng;
      const map = mapRef.current;

      const isAllowed = isPointInAllowedRegion([lng, lat]);

      if (!isAllowed) {
        if (map) {
          const popup = L.popup()
            .setLatLng([lat, lng])
            .setContent("🚫 Outside allowed area")
            .openOn(map);

          setTimeout(() => {
            map.closePopup(popup);
          }, 3000);
        }
        return;
      }

      try {
        const { data } = await addOlive({
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
        });

        setOlives((prev) => [...prev, data.data]);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Error adding olive:", error);
        }
      }
    },
    [navigate, mapRef, setOlives]
  );
};
