import classes from "./App.module.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router";
import useAuthStore from "../store/authStore";

import Error from "../pages/Error/Error";
import Redirect from "../pages/Redirect/Redirect";
import Login from "../pages/Login/Login";
import Files from "../pages/Files/Files";
import Registration from "../pages/Registration/Registration";
import ProtectedRoute from "../pages/ProtectedRoute/ProtectedRoute";

import { useEffect } from "react";

function App() {
  const { checkAuth } = useAuthStore();
  const { isAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/files", { replace: true });
  //   }

  // }, [isAuth]);

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/files"
            element={
              <ProtectedRoute>
                <Files />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Redirect />} />

          {/* <Route path="*" element={<Error />}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
