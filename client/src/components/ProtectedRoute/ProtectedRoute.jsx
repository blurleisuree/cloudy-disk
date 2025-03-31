import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/authStore";
import Loader from "../UI/Loader/Loader";

function ProtectedRoute() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <Loader fullPage={true}/>
  }

  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
