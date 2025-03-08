import classes from "./App.module.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import useAuthStore from "../store/authStore";

import AuthPage from "../pages/AuthPage/AuthPage";
import Redirect from "../pages/Redirect/Redirect";
import Files from "../pages/Files/Files";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";

import { useEffect } from "react";

function App() {
  const { checkAuth, isAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/files" element={<Files />} />
          </Route>

          {/* 
          <Route
            path="/files"
            element={
              <ProtectedRoute>
                <Files />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="*" element={<Redirect />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
