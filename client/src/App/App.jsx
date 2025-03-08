import classes from "./App.module.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import useAuthStore from "../store/authStore";

import AuthPage from "../pages/AuthPage/AuthPage";
import Files from "../pages/Files/Files";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";

import { useEffect } from "react";
import LoaderPage from "../components/LoaderPage/LoaderPage";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loading = useAuthStore((state) => state.laoding);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth]);

  if (loading) return <LoaderPage />;

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
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
