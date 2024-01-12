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
import Table from "./Pages/component/Table/Table";
import Form from "./Pages/component/Form/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicExample />,
  },
  {
    path: "/Form/:id",
    element: <Form />,
  },
  {
    path: "/Table",
    element: <Table />,
  },
  {
    path: "/Form",
    element: <Form />,
  },
]);

export default router;
