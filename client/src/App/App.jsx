import classes from "./App.module.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import useAuthStore from "../store/authStore";

import AuthPage from "../pages/AuthPage/AuthPage";
import AuthForm from "../components/AuthForm/AuthForm";
import VerifyPage from "../pages/VerifyPage/VerifyPage";
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
    <div className={classes.App}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthPage />}>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/auth/verify" element={<VerifyPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/files" element={<Files />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
