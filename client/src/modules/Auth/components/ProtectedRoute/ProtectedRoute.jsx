import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../../../shared/store/authStore";
import Loader from '../../../../shared/components/UI/Loader/Loader';

function ProtectedRoute() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <Loader fullPage={true}/>
  }

  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
