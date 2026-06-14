import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/login";
import RegistrationPage from "./pages/registration/registration";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
