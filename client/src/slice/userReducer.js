import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id:localStorage.getItem("id") ?? "",
  name: localStorage.getItem("name") ?? "",
  role: localStorage.getItem("role") ?? "",
  token: localStorage.getItem("token") ?? "",
  tokenExpiresAt: localStorage.getItem("tokenExpiresAt") ?? 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.tokenExpiresAt = action.payload.tokenExpiresAt;
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenExpiresAt", action.payload.tokenExpiresAt);
      return state;
    },
    logout: (state) => {
      state.id= "";
      state.name = "";
      state.role = "";
      state.token = "";
      state.tokenExpiresAt = 0;
      localStorage.clear();
    },
  },
});

export const { login: loginAction, logout: logoutAction } = userSlice.actions;
export const getLoginStatus = (state) => state.user.token.length !== 0;
export const getName = (state) => state.user.name;
export const getRole = (state) => state.user.role;
export const getToken = (state) => state.user.token;
export const getTokenExpiresAt = (state) => state.user.tokenExpiresAt;
export default userSlice.reducer;