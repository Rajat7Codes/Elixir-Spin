import axios from "axios";

let jwtToken: string | null = localStorage.getItem("jwt");

const setToken = (token: string | null) => {
  jwtToken = token;
  if (token) {
    localStorage.setItem("jwt", token);
  } else {
    localStorage.removeItem("jwt");
  }
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (jwtToken && config.headers) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setToken(null);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;