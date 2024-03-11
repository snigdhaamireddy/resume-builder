import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import NotFoundPage from "../pages/NotFoundPage/NotFound";
import { getLoginStatus } from "../slice/userReducer";
import Navbar from "./Navbar/Navbar";
import UsersPage from "../pages/UsersPage/usersPage";
import './Navbar/styles.css';
import BatchGrid from "../pages/batchCard/index";

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
                <Route
                path="/batches"
                element={
                    <BatchGrid></BatchGrid>
                }
            />
            <Route
                path="/batches/:id"
                element={<>
                <Navbar></Navbar>
                <UsersPage></UsersPage></>}
            >
            
            </Route>
        </Routes>
        </Suspense>
    )
};

export default RoutesComponent;