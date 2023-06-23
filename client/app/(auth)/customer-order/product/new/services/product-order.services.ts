import axios from "axios";

import { getHeaders, url } from "./api";

// eslint-disable-next-line import/prefer-default-export
export const createOrder = (body: any) => {
  return axios.post(`${url}/sn_ind_tmt_orm/order/productOrder`, body, {
    headers: getHeaders(),
  });
};
