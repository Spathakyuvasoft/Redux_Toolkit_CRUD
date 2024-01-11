import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

import BasicExample from "./Pages/User/UserForm"; 
import Table from "./Pages/component/Table/Table"

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicExample />,
  },
  {
    path: "/Table",
    element: <Table />,
  },
]);

export default router;
