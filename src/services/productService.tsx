import axios from "axios";
import { Base_URL } from "../constant/BaseUrl.tsx";

axios.defaults.baseURL = Base_URL;

axios.interceptors.request.use(
  function (config: any) {
    config.headers["Content-Type"] = "application/json";
    // config.header["Cache-Control"] = "max-age=3600"
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

const ProductService = {
  fetchProduct: async () => {
    // console.log("DETTT", date);
    return await axios.get("/product");
  },
};

export default ProductService;
