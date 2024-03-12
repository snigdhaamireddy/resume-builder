import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userReducer";
import snackbarReducer from "./slice/snackbarReducer";

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;