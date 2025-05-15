import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";

function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
