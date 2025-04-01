import { lazy, Suspense } from "react";

const MapView = lazy(() => import("../../components/MapView/MapView"));

const MapPage = () => {


  return (
    <div>
      <h2>Map</h2>
      <Suspense fallback={<div>Loading map...</div>}>
        <MapView />
      </Suspense>
    </div>
  );
};

export default MapPage;

