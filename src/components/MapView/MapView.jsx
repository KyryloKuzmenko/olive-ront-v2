import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useDispatch } from "react-redux";

import OlivesLayer from "./OlivesLayer";
import MapEventHandler from "./MapEventHandler";
import { logout } from "../../redux/auth/authThunk";
import { allowedRegions } from "../../data/regions";

import styles from "./MapView.module.css";
import { userIcon } from "../../utils/mapIcons";
import { useUserLocation } from "../../hooks/useUserLocation";
import { useOlives } from "../../hooks/useOlives";
import { useMapClickHandler } from "../../hooks/useMapClickHandler";
import LocateButton from "../LocateButton/LocateButton";

const MapView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mapRef = useRef();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/login");
  };

  const userLocation = useUserLocation();
  const { olives, setOlives } = useOlives(navigate);

  const handleMapDblClick = useMapClickHandler(
    navigate,
    mapRef,
    setOlives,
    olives
  );
  if (!userLocation) return <div>Loading map...</div>;

  return (
    <div className={styles.mapContainer}>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
      <LocateButton mapRef={mapRef} userLocation={userLocation} />
      <MapContainer
        center={userLocation}
        zoom={15}
        doubleClickZoom={false}
        className={styles.map}
        ref={mapRef}
      >
        <GeoJSON
          data={allowedRegions}
          style={() => ({
            color: "blue",
            weight: 2,
            fillOpacity: 0.1,
          })}
        />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={userLocation} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
        <OlivesLayer olives={olives} />
        <MapEventHandler onDoubleClick={handleMapDblClick} />
      </MapContainer>
    </div>
  );
};

export default MapView;
