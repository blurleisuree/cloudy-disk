import { useNavigate } from "react-router";
import { useEffect } from "react";
import classes from "./Redirect.module.css";
import Loader from "../../components/UI/Loader/Loader";

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Здесь можно добавить логику перед редиректом
    setTimeout(() => {
      navigate("/auth", { replace: true });
    }, 1000);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default Redirect;
