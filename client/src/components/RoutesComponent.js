import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";

const LoginPage = lazy(() => import("../pages/loginPage/loginPage"));

const RoutesComponent = () => {
    return(
        <Suspense fallback={<LinearProgress />}>
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate to={"/login"} />
                }
            />
            <Route
                path="/login"
                element={<LoginPage />}
            />
        </Routes>
        </Suspense>
    )
};

export default RoutesComponent;