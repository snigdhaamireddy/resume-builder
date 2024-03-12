import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import NotFoundPage from "../pages/NotFoundPage/NotFound";
import { getLoginStatus, getRole } from "../slice/userReducer";
import Protected from "./ProtectedRoute";

const LoginPage = lazy(() => import("../pages/loginPage/loginPage"));
const BatchesPage = lazy(() => import("../pages/batchCard/index"));
const UsersPage = lazy(() => import("../pages/UsersPage/usersPage"));
const UserForm = lazy(() => import("../pages/userFormPage/index"));

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
        <Route element={<Protected />}>
          <Route path="/batches" element={<BatchesPage />} />
          <Route path="/batches/:id" element={<UsersPage />} />
          <Route path="/form" element={<UserForm />} />
        </Route>
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
