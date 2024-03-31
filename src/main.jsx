import React from "react";
import ReactDOM from "react-dom/client";

import IndexPage from "./pages/IndexPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import SettingsPage from "./pages/SettingsPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/index",
    element: <IndexPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
