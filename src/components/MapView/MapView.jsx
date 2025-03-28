import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useDispatch } from "react-redux";

import { getOlives, addOlive } from "../../services/api";
import OlivesLayer from "./OlivesLayer";
import MapEventHandler from "./MapEventHandler";
import { logout } from "../../redux/auth/authThunk";
import { allowedRegions } from "../../data/regions";
import { isPointInAllowedRegion } from "../../utils/geoHelper";

import styles from "./MapView.module.css";

// 1️⃣ Создаем пользовательскую иконку для маркера "You are here"
const userIcon = new L.Icon({
  iconUrl: "/img/bunny.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const MapView = () => {
  const [olives, setOlives] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/login");
  };

  // 1) Определяем геолокацию пользователя
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          console.warn("Геолокация не доступна. Используем Киев.");
          setUserLocation([50.4501, 30.5234]);
        }
      );
    } else {
      console.warn("Геолокация не поддерживается браузером. Используем Киев.");
      setUserLocation([50.4501, 30.5234]);
    }
  }, []);

  // 2) Загружаем маркеры с бэкенда
  // fetchOlives
  const fetchOlives = async () => {
    try {
      const { data } = await getOlives();
      setOlives(data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching olives:", error);
      }
    }
  };

  useEffect(() => {
    fetchOlives();

    const interval = setInterval(fetchOlives, 12000);

    return () => clearInterval(interval);
  }, []);

  // 3) Обработка двойного клика: добавляем новый маркер
  // handleMapDblClick
  const handleMapDblClick = async (e) => {
    const { lat, lng } = e.latlng;

    const isAllowed = isPointInAllowedRegion([lng, lat]);

    if (!isAllowed) {
      // 🔔 Показываем кастомное сообщение — дальше настроим
      setWarning("You can only place markers inside the allowed area");
      setTimeout(() => setWarning(""), 3000);
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
  };


  if (!userLocation) return <div>Loading map...</div>;

  return (
    <div className={styles.mapContainer}>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
      {warning && <div className={styles.warning}>{warning}</div>}

      <MapContainer
        center={userLocation}
        zoom={13}
        doubleClickZoom={false}
        className={styles.map}
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
