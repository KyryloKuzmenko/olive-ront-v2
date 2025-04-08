import { lazy, Suspense } from "react";

import styles from "./MapPage.module.css";

const MapView = lazy(() => import("../../components/MapView/MapView"));

const MapPage = () => {


  return (
    <div className={styles.pageWrapper}>
      <h2>Map</h2>
      <Suspense fallback={<div>Loading map...</div>}>
        <MapView />
      </Suspense>
    </div>
  );
};

export default MapPage;

