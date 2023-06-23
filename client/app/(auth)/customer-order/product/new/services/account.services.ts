import axios from "axios";

import { getHeaders, url } from "./api";

// eslint-disable-next-line import/prefer-default-export
export const getAccountById = (id: string) => {
  return axios.get(`${url}/now/account/${id}`, {
    headers: getHeaders(),
  });
};
