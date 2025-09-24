import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
  withCredentials: true, // for cookies/session support
});

// Helper for attaching token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
