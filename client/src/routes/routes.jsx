import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import RedirectAuthenticatedUser from "./RedirectAuthenticatedUser";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorComp from "../components/common/ErrorComp";
import EmailVerificationPage from "../pages/Auth/EmailVerificationPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import AdminPanel from "../pages/Admin/AdminPanel";

// Lazy-loaded pages
// const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
// const SignupPage = lazy(() => import("../pages/Auth/SignupPage"));
// const HomePage = lazy(() => import("../pages/HomePage"));
const ForgotPasswordPage = lazy(() =>
  import("../pages/Auth/ForgotPasswordPage")
);
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
        element: <HomePage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>{withSuspense(<ProfilePage />)}</ProtectedRoute>
        ),
      },
      // Admin Routes
      {
        path: "admin",
        element: (
          <AdminProtectedRoute>
            {withSuspense(<AdminPanel />)}
          </AdminProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
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
        path: "verify-email",
        element: (
          <RedirectAuthenticatedUser>
            <EmailVerificationPage />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "forgot-password",
        element: withSuspense(<ForgotPasswordPage />),
      },
      {
        path: "reset-password/:token",
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
