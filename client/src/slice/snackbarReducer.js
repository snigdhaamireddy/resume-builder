import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      state.snackbarMessage = action.payload.snackbarMessage;
      state.snackbarOpen = action.payload.snackbarOpen;
      state.snackbarType = action.payload.snackbarType;
    },
    clearSnackbar: (state) => {
      state.snackbarOpen = initialState.snackbarOpen;
    },
  },
});

export const {
  setSnackbar: setSnackbarAction,
  clearSnackbar: clearSnackbarAction,
} = snackbarSlice.actions;

export const getSnackbarOpen = (state) => state.snackbar.snackbarOpen;
export const getSnackbarType = (state) => state.snackbar.snackbarType;
export const getSnackbarMessage = (state) => state.snackbar.snackbarMessage;

export default snackbarSlice.reducer;