import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import NotFoundPage from "../pages/NotFoundPage/NotFound";
import { getLoginStatus } from "../slice/userReducer";

const LoginPage = lazy(() => import("../pages/loginPage/loginPage"));

const RoutesComponent = () => {
    const isUserLoggedIn = useSelector(getLoginStatus);
    return(
        <Suspense fallback={<LinearProgress />}>
        <Routes>
            <Route
                path="/"
                element={
                    isUserLoggedIn
                    ? <Navigate to={"/batches"} />
                    : <Navigate to={"/login"} />
                }
            />
            <Route
                path="/login"
                element={isUserLoggedIn ? <Navigate to={"/batches"} /> : <LoginPage />}
            />
            <Route element={<NotFoundPage />} path="*" />
        </Routes>
        </Suspense>
    )
};

export default RoutesComponent;