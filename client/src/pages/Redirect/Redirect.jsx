import { useNavigate } from "react-router";
import { useEffect } from "react";
import Loader from '../../components/UI/Loader';
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

  return <Loader fullPage={true} />;
}

export default Redirect;
