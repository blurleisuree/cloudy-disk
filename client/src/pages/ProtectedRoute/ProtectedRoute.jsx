import { Navigate } from "react-router";
import useAuthStore from "../../store/authStore";

import useEffect from "react";

function ProtectedRoute({ children }) {
  const { isAuth, loading } = useAuthStore();

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
