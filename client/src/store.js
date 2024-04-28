import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./slice/userReducer";
import snackbarReducer from "./slice/snackbarReducer";

const persistConfig = {
 key: 'root',
 storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['persist/PERSIST'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['register'],
    },
  }),
});

export const persistor = persistStore(store);