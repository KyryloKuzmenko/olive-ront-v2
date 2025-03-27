import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshAuth } from "../../redux/auth/authThunk";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated === null) {
      dispatch(refreshAuth());
    }
  }, [dispatch, isAuthenticated]);

    if (isAuthenticated === null || loading) {
      return <div>Checking auth...</div>;
    }

   if (!isAuthenticated) {
     return <Navigate to="/login" replace />;
   }

  return children;
};

export default ProtectedRoute;
