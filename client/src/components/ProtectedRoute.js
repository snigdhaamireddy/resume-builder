import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Navbar from "./Navbar/Navbar";
import { getLoginStatus } from "../slice/userReducer";

function Protected() {
  const isUserLoggedIn = useSelector(getLoginStatus);
  return isUserLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Protected;