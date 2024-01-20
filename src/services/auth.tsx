import axios from "axios";
import { Base_URL } from "../constant/BaseUrl.tsx";

axios.defaults.baseURL = Base_URL;

axios.interceptors.request.use(
  function (config: any) {
    // config.headers.post["Content-Type"] = "application/json";
    // config.headers.common.Accept = "application/json";
    // Ensure headers object is defined
    // config.headers = config.headers || {};

    // config.headers.post["Access-Control-Allow-Origin"] = "*";
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthService = {
  Login: async (data: any) => {
    return await axios.post("/login", data);
  },
};

export default AuthService;
