import axios from "axios";

import { getHeaders, url } from "./api";

// eslint-disable-next-line import/prefer-default-export
export const getAllProductOfferings = () => {
  return axios.get(`${url}/sn_prd_pm_adv/catalogmanagement/productoffering`, {
    headers: getHeaders(),
  });
};
