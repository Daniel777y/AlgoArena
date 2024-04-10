import React from "react";
import ReactDOM from "react-dom/client";

import IndexPage from "./pages/IndexPage";
import ErrorPage from "./pages/ErrorPage";
import SettingsPage from "./pages/SettingsPage";
import RankingPage from "./pages/RankingPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserInfoProvider } from "./contexts/UserInfoContext";
import { AccountsProvider } from "./contexts/AccountsContext";

const router = createBrowserRouter([
  {
    path: "/index",
    element: <IndexPage />,
  },
  {
    path: "/ranking",
    element: <RankingPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserInfoProvider>
      <AccountsProvider>
        <RouterProvider router={router} />
      </AccountsProvider>
    </UserInfoProvider>
  </React.StrictMode>,
);
