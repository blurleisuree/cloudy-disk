import { Navigate } from "react-router";

import AuthPage from "../../pages/AuthPage/AuthPage.jsx";
import {
  AuthContainer,
  ResetPassForm,
  ForgotForm,
  VerifyForm,
  AuthForm,
  PublicRoute,
  ProtectedRoute,
} from "../../modules/Auth/index.js";

import Main from "../../pages/Main/Main";
import Files from "../../pages/Files/Files";
import Favourite from "../../pages/Favourite/Favourite.jsx";
import Profile from "../../pages/Profile/Profile.jsx";
import SettingsPage from "../../pages/Profile/SettingsPage/SettingsPages.jsx";
import DetailsPage from "../../pages/Profile/DetailsPage/DetailsPage.jsx";

export const routeConfig = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          {
            path: "",
            element: <AuthContainer />,
            children: [
              { path: "", element: <AuthForm /> },
              { path: "verify", element: <VerifyForm /> },
              { path: "forgot-password", element: <ForgotForm /> },
              { path: "reset-password", element: <ResetPassForm /> },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          { path: "", element: <Navigate to="files" replace /> },
          { path: "files", element: <Files /> },
          { path: "favourite", element: <Favourite /> },
          {
            path: "profile",
            element: <Profile />,
            children: [
              { path: "", element: <Navigate to="details" replace /> },
              { path: "settings", element: <SettingsPage /> },
              { path: "details", element: <DetailsPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
