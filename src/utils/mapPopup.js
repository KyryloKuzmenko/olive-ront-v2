
import L from "leaflet";

export const showMapPopup = (map, latlng, message, duration = 3000) => {
  if (!map) return;

  const popup = L.popup().setLatLng(latlng).setContent(message).openOn(map);

  setTimeout(() => {
    map.closePopup(popup);
  }, duration);
};
