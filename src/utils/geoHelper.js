import * as turf from "@turf/turf";
import { allowedRegions } from "../data/regions";

export const isPointInAllowedRegion = ([lng, lat]) => {
  const point = turf.point([lng, lat]);

  return allowedRegions.features.some((region) =>
    turf.booleanPointInPolygon(point, region)
  );
};

export const isPointInAllowedRadius = ([lng, lat], existingMarkers) => {
  const newPoint = turf.point([lng, lat]);

  return !existingMarkers.some((marker) => {
    const [mLng, mLat] = marker.location.coordinates;
    const markerPoint = turf.point([mLng, mLat]);

    const distance = turf.distance(newPoint, markerPoint, { units: "meters" });

    return distance < 200;
  });
};


export const isMarkerLimitReached = (error) => {
  const code = error.response?.data?.code
  return code === "MARKER_LIMIT_REACHED";
};

export const isTooSoon = (error) => {
  const code = error.response?.data?.code;
  return code === "TOO_SOON";
}


