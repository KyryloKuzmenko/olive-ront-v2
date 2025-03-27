import { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/auth/authThunk";

const MapView = lazy(() => import("../../components/MapView/MapView"));

const MapPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Map</h2>

      <Suspense fallback={<div>Loading map...</div>}>
        <MapView />
      </Suspense>
    </div>
  );
};

export default MapPage;

// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import MapView from "../../components/MapView/MapView";
// import { logout } from "../../redux/auth/authThunk";

// const MapPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await dispatch(logout()).unwrap();
//     navigate("/login");
//   };

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//       <h2>Map</h2>
//       <MapView />
//     </div>
//   );
// };

// export default MapPage;
