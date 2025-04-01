import classes from "./App.module.css";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import useAuthStore from "../store/authStore";

import AuthPage from "../pages/AuthPage/AuthPage";

import AuthForm from "../components/AuthForm/AuthForm";
import VerifyForm from "../components/VerifyForm/VerifyForm";
import ForgotForm from "../components/ForgotForm/ForgotForm";
import ResetPassForm from "../components/ResetPassForm/ResetPassForm.jsx";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";

import Main from "../pages/Main/Main";

import Files from "../pages/Files/Files";
import Favourite from "../pages/Favourite/Favourite.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Settings from "../pages/Profile/Settings/Settings.jsx";
import Details from "../pages/Profile/Details/Details.jsx";

import Message from "../shared/components/Message/Message.jsx";
import Loader from "../shared/components/UI/Loader/Loader.jsx";
import Modal from "../shared/components/Modal/Modal.jsx";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loading = useAuthStore((state) => state.laoding);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth]);

  if (loading) return <Loader fullPage={true} />;

  return (
    <div className={classes.App}>
      <Message />
      <Modal />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthPage />}>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/auth/verify" element={<VerifyForm />} />
            <Route path="/auth/forgot-password" element={<ForgotForm />} />
            <Route path="/auth/reset-password" element={<ResetPassForm />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />}>
            <Route index element={<Navigate to="files" replace />} />
            <Route path="files" element={<Files />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<Navigate to="settings" replace />} />
              <Route path="settings" element={<Settings />} />
              <Route path="details" element={<Details />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
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
