import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PageLoader from "./components/PageLoader/PageLoader";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const MapPage = lazy(() => import("./pages/MapPage/MapPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />
    </Routes>
    </Suspense>
  );
}

export default App;
