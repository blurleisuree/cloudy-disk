import classes from "./App.module.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import useAuthStore from "../store/authStore";

import Error from "../pages/Error/Error";
import Redirect from "../pages/Redirect/Redirect";
import Login from "../pages/Login/Login";
import Files from "../pages/Files/Files";
import Registration from "../pages/Registration/Registration";
import { useEffect } from "react";

function App() {
  // const {checkAuth} = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth])

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          <Route path="/files" element={<Files />} />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Redirect />} />
          {/* <Route path="*" element={<Error />}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
