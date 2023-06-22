import axios from "axios";

import { getHeaders, url } from "./api";

// eslint-disable-next-line import/prefer-default-export
export const getContacts = () => {
  return axios.get(`${url}/now/contact`, {
    headers: getHeaders(),
  });
};
