import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔥 👉 Base URL apontando para seu backend local Spring Boot
const API_BASE_URL = "http://192.168.15.9:8080/api";

// 🔗 Criação do cliente axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// (Opcional) Interceptor para adicionar token, se necessário no futuro
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
