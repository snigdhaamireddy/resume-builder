import axios from "axios";
import { logoutAction } from "./slice/userReducer";
import { setSnackbarAction } from "./slice/snackbarReducer";
import { store } from "./store";

const API_URL = process.env.REACT_APP_API_URL;

const apiMethod = (token) =>
  axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const token = store.getState().user.token;

const api = apiMethod(token);

api.interceptors.request.use(
  (config) => {
    if (config.url.includes('/login')) {
      return config;
    }
    const state = store.getState();
    const token = state.user.token;
    const expiresAt = state.user.tokenExpiresAt;
    if (token && expiresAt <= Date.now()) {
      store.dispatch(
        setSnackbarAction({
          snackbarOpen: true,
          snackbarMessage: "Session expired. Please login again",
          snackbarType: "error",
        })
      )
      store.dispatch(logoutAction());
      window.location.href = '/login'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
 );

export default api;