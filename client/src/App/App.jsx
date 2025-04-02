import classes from "./App.module.css";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import useAuthStore from "../store/authStore";

import AuthPage from "../pages/AuthPage/AuthPage";

import {
  AuthContainer,
  ResetPassForm,
  ForgotForm,
  VerifyForm,
  AuthForm,
  PublicRoute,
  ProtectedRoute,
} from "../modules/Auth/index.js";

import Main from "../pages/Main/Main";
import Files from "../pages/Files/Files";
import Favourite from "../pages/Favourite/Favourite.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import SettingsPage from '../pages/Profile/SettingsPage/SettingsPages.jsx'
import DetailsPage from "../pages/Profile/DetailsPage/DetailsPage.jsx";

import Message from "../shared/components/Message/Message.jsx";
import Loader from "../shared/components/UI/Loader/Loader.jsx";
import Modal from "../shared/components/Modal/Modal.jsx";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (e) {
        console.error("Ошибка проверки авторизации:", e);
      }
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
            <Route path="/auth" element={<AuthContainer />}>
              <Route index element={<AuthForm />} />
              <Route path="verify" element={<VerifyForm />} />
              <Route path="forgot-password" element={<ForgotForm />} />
              <Route path="reset-password" element={<ResetPassForm />} />
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />}>
            <Route index element={<Navigate to="files" replace />} />
            {/* {filesPages.map((page) => <Route path={page.path} element={<Files type={page.type}/>} />)} */}
            <Route path="files" element={<Files />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<Navigate to="details" replace />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="details" element={<DetailsPage />} />
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
