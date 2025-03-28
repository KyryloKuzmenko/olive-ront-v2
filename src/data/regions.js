const cherkasy = [
  [29.586044355528433, 49.174353177074714],
  [32.10205044597388, 50.215667659588846],
  [32.998534385114915, 49.072606775462056],
  [30.038817822933197, 48.45270566473867],
  [29.586044355528433, 49.174353177074714],
];

const stjohns = [
  [-52.781890877522535, 47.57449912208936],
  [-52.7106170821935, 47.63163079143693],
  [-52.64538575895131, 47.586263898766354],
  [-52.732177799334764, 47.514708052230446],
  [-52.781890877522535, 47.57449912208936],
];

export const allowedRegions = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Cherkasy" },
      geometry: {
        type: "Polygon",
        coordinates: [cherkasy],
      },
    },
    {
      type: "Feature",
      properties: { name: "St. John's" },
      geometry: {
        type: "Polygon",
        coordinates: [stjohns],
      },
    },
  ],
};