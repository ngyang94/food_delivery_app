import axios from "axios";

const baseUrl = "../dummy-json-data";

const api = axios.create({
  baseURL: baseUrl,
});
api.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  async (error: any) => {
    return Promise.reject(error);
  },
);

export default api;
