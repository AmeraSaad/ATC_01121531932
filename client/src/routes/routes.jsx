// src/routes/routes.jsx
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorComp from "../components/common/ErrorComp";
import RedirectAuthenticatedUser from "./RedirectAuthenticatedUser";
import EmailVerificationPage from "../pages/Auth/EmailVerificationPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";

// Lazy-loaded pages
// const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
// const SignupPage = lazy(() => import("../pages/Auth/SignupPage"));
// const HomePage = lazy(() => import("../pages/HomePage"));
const ForgotPasswordPage = lazy(() =>import("../pages/Auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/Auth/ResetPasswordPage"));

const withSuspense = (element) => (
  <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "signup",
        element: (
          <RedirectAuthenticatedUser>
            <SignupPage />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/verify-email",
        element: (
          <RedirectAuthenticatedUser>
            <EmailVerificationPage />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/forgot-password",
        element: withSuspense(<ForgotPasswordPage />),
      },
      {
        path: "/reset-password/:token",
        element: (
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        ),
      },
    ],
  },
]);

export default routes;
