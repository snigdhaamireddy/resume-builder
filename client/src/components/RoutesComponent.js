import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import NotFoundPage from "../pages/NotFoundPage/NotFound";
import { getLoginStatus, getRole } from "../slice/userReducer";
import Navbar from "./Navbar/Navbar";
import UsersPage from "../pages/UsersPage/usersPage";
import "./Navbar/styles.css";
import BatchGrid from "../pages/batchCard/index";

const LoginPage = lazy(() => import("../pages/loginPage/loginPage"));

const RoutesComponent = () => {
  const isUserLoggedIn = useSelector(getLoginStatus);
  const userRole = useSelector(getRole);

  const getDashBoardByRole = () => {
    return userRole === "admin" ? (
      <Navigate to={"/batches"} />
    ) : (
      <Navigate to={"/form"} />
    );
  };

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route
          path="/"
          element={
            isUserLoggedIn ? getDashBoardByRole() : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/login"
          element={isUserLoggedIn ? getDashBoardByRole() : <LoginPage />}
        />
        <Route path="/batches" element={<BatchGrid></BatchGrid>} />
        <Route
          path="/batches/:id"
          element={
            <>
              <Navbar></Navbar>
              <UsersPage></UsersPage>
            </>
          }
        ></Route>
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
