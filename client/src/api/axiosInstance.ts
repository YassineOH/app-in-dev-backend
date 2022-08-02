import axios from "axios";

import { store } from "../app/store";

const axiosInstance = () => {
  const token = store.getState().admin.token;

  return axios.create({
    baseURL: "/api/v1",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default axiosInstance;
