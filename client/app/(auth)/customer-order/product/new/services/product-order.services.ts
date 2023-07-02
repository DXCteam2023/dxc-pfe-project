import axios from "axios";

import { getHeaders, url } from "./api";

const serverUrl = process.env.NEXT_PUBLIC_AXIOS_URL;

// eslint-disable-next-line import/prefer-default-export
export const createOrder = (body: any) => {
  // return axios.post(`${url}/sn_ind_tmt_orm/order/productOrder`, body, {
  //   headers: getHeaders(),
  // });
  return axios.post(
    `${serverUrl}/api/customer-order/product/servicenow`,
    body,
    {
      headers: getHeaders(),
    },
  );
};
