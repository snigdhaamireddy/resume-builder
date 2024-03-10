import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./Constants";
import RoutesComponent from "./components/RoutesComponent";
import { getTokenExpiresAt, logoutAction } from "./slice/userReducer";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userExpired, setUserExpired] = useState(false);
  const [open, setOpen] = useState(false);
  const tokenExpiresAt = useSelector(getTokenExpiresAt);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  useEffect(() => {
    if(Date.now() >= tokenExpiresAt){
      setOpen(true);
      setUserExpired(true);
      dispatch(logoutAction());
      navigate("/login");
    }
  }, [dispatch, tokenExpiresAt, navigate]);

  return (
      <ThemeProvider theme={lightTheme}>
        {userExpired && (
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity="error"
            >
              Session expired. Please login.
            </Alert>
          </Snackbar>
        )}
        <RoutesComponent />
      </ThemeProvider>
  );
}

export default App;
