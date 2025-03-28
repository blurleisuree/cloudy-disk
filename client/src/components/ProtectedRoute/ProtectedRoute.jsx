import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/authStore";

import LoaderPage from "../LoaderPage/LoaderPage";

function ProtectedRoute() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <LoaderPage />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
