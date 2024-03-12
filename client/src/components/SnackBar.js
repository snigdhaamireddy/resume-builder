import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import {
  clearSnackbarAction,
  getSnackbarMessage,
  getSnackbarType,
  getSnackbarOpen,
} from "../slice/snackbarReducer";

const SnackBar = () => {
  const dispatch = useDispatch();
  const snackbarOpen = useSelector(getSnackbarOpen);
  const snackbarType = useSelector(getSnackbarType);
  const snackbarMessage = useSelector(getSnackbarMessage);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearSnackbarAction());
  };

  return (
    <div
      style={{
        width: "100%",
        "& > * + *": {
          marginTop: (theme) => theme.spacing(2),
        },
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          security={snackbarType}
          severity={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
