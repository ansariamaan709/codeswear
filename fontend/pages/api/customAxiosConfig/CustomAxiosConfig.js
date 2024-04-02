import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token from localStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
