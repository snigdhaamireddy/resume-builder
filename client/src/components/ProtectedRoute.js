import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import { getLoginStatus } from "../slice/userReducer";

function Protected() {
  const isUserLoggedIn = useSelector(getLoginStatus);
  return isUserLoggedIn ? (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          marginTop: "7vh",
          maxHeight: "93vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Protected;
