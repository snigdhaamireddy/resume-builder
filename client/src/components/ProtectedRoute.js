import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import { getLoginStatus, logoutAction } from "../slice/userReducer";
import { setSnackbarAction } from "../slice/snackbarReducer";

function Protected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
    if (Date.now() >= tokenExpiresAt) {
      dispatch(
        setSnackbarAction({
          snackbarOpen: true,
          snackbarMessage: "Session expired. Please login again",
          snackbarType: "error",
        })
      );
      dispatch(logoutAction());
      navigate("/login");
    }
  }, [dispatch, navigate]);

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
