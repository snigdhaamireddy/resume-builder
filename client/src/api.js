import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const apiMethod = (token) =>
  axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const token = localStorage.getItem("token");

export const api = apiMethod(token);