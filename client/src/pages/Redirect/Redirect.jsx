import { useNavigate } from "react-router";
import { useEffect } from "react";
import LoaderPage from "../../components/LoaderPage/LoaderPage";
import useAuthStore from "../../store/authStore";

function Redirect() {
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    setTimeout(() => {
      if (isAuth) {
        navigate("/files", { replace: true });
      }

      navigate("/auth", { replace: true });
    }, 1000);
  }, [navigate, isAuth]);

  return <LoaderPage />;
}

export default Redirect;
