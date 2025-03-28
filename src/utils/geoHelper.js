import * as turf from "@turf/turf";
import { allowedRegions } from "../data/regions";

export const isPointInAllowedRegion = ([lng, lat]) => {
  const point = turf.point([lng, lat]);

  return allowedRegions.features.some((region) =>
    turf.booleanPointInPolygon(point, region)
  );
};
