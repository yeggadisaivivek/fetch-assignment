import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const navigate = useNavigate();
      navigate("/");
    }
    return Promise.reject(error);
  }
);

export default api;