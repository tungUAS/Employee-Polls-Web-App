import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LoginPage />}>
      <Route path="/questions" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
    </Route>
  )
);
  export default MainRouter;