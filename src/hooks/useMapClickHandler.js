import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  isPointInAllowedRegion,
  isPointInAllowedRadius,
  isMarkerLimitReached,
  isTooSoon,
} from "../utils/geoHelper";
import { showMapPopup } from "../utils/mapPopup";
import { addOliveOnMap } from "../redux/olives/oliveThunk";

export const useMapClickHandler = (navigate, mapRef, olives) => {
  // newcode
  const dispatch = useDispatch();

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

      // 2️⃣ Проверка: не ближе 200м к другим маркерам
      if (!isPointInAllowedRadius([lng, lat], olives)) {
        if (map) {
          const popup = L.popup()
            .setLatLng([lat, lng])
            .setContent("🚫 Too close to another marker")
            .openOn(map);

          setTimeout(() => {
            map.closePopup(popup);
          }, 3000);
        }
        return;
      }
      try {
        await dispatch(addOliveOnMap([lng, lat])).unwrap();
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else if (isMarkerLimitReached(error)) {
          showMapPopup(
            mapRef.current,
            [lat, lng],
            "⏳ You can only place 3 markers per hour"
          );
        } else if (isTooSoon(error)) {
          showMapPopup(mapRef.current, [lat, lng], "⏳ Please wait 10s");
        } else {
          console.error("Error adding olive:", error);
        }
      }
    },
    [navigate, mapRef, olives, dispatch]
  );
};
