import { Request, Response } from "express";
import axios from "axios";
import { ObjectId } from "mongodb";
import DataModel from "../../../models/data";
import qs from "qs";

export default async function addProductOrderToServiceNow(
  req: Request,
  res: Response
) {
  const payload = req.body;

  const data = await DataModel.findOne({});

  const access_token = data.access_token;
  const order_number = +data.order_number + 1;

  let orderNumber = Array(6).fill("0");

  let stringOrderNumber = String(order_number).split("");

  let totalNumber = orderNumber.concat(stringOrderNumber);

  if (totalNumber.length > 6) {
    totalNumber.splice(0, totalNumber.length - 6);
  }

  payload.externalId = "PO" + totalNumber.join("");

  // console.log(access_token);

  let newProductOrder;
  const mongodbId: ObjectId = new ObjectId(data._id);

  res.setHeader("Content-Type", "application/json");

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://dev174830.service-now.com/api/sn_ind_tmt_orm/order/productOrder",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        Cookie:
          "BIGipServerpool_dev174830=495998730.35134.0000; JSESSIONID=A2E08104C4CC46B511A35B4E0CCF4EC5; glide_session_store=8D9179DB97EFAD10720F7A200153AFC8; glide_user_route=glide.dcbc4af8666824ee4372a55062687d69",
      },
      data: payload,
    };

    newProductOrder = await axios
      .request(config)
      .then((response) => {
        console.log({
          message: "Product Order created for the first try in servicenow",
        });
        return response.data;
      })
      .catch((error) => {
        console.log({
          message: "Product Order not created for the first try in servicenow",
        });
        return { error };
      });
    if (newProductOrder.error) {
      let oAuthData = qs.stringify({
        grant_type: "password",
        client_id: "7c31b95f18efad109790b6fa6d1bc926",
        client_secret: "<jna9DEIp(",
        username: "technical.user",
        password:
          "#unD&gU^0O)?qI*+gPRqw98wN#GsEi30@w54;IQ](W.xf?VVG@@y0SixZTt&R,aaz+@iJBRt{Bx+?PNXYq-a)1f1:dwmkV1uXu@h",
      });

      let oAuthTokenConfig = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://dev174830.service-now.com/oauth_token.do",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie:
            "BIGipServerpool_dev174830=495998730.35134.0000; JSESSIONID=A2E08104C4CC46B511A35B4E0CCF4EC5; glide_session_store=8D9179DB97EFAD10720F7A200153AFC8; glide_user_route=glide.dcbc4af8666824ee4372a55062687d69",
        },
        data: oAuthData,
      };

      const tokens = await axios
        .request(oAuthTokenConfig)
        .then((response) => {
          console.log({ message: "New token generated" });
          return response.data;
        })
        .catch((error) => {
          return { error };
        });

      if (tokens.error) {
        res.status(500).send(
          JSON.stringify({
            message: "Error while trying to generate a new token",
          })
        );
      }

      // const oldToken = await Data.findOne({ access_token: access_token });

      // mongodbId = new ObjectId(oldToken._id);

      const newToken = await DataModel.findByIdAndUpdate(
        mongodbId,
        {
          access_token: tokens.access_token,
        },
        { new: true }
      );

      config.headers.Authorization = `Bearer ${newToken.access_token}`;

      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: "https://dev106794.service-now.com/api/sn_ind_tmt_orm/order/productOrder",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${newToken.access_token}`,
      //     Cookie:
      //       "BIGipServerpool_dev106794=479287306.39742.0000; JSESSIONID=FFF7FFA9F19993F03C1B52F1A127A2AC; glide_user_activity=U0N2M18xOkg5b3NtbkxhSHEvaGU1ZmthdlB3QXd0MFo2TFNuSk1hekIyblRmTVFTSXc9OmVES2dEUi9aUUtPb095R2tuN2M3WXlsYkJDRDJhaXdNaUplOVg3dk54RTg9; glide_user_route=glide.0e34b6baadf33e7786d672daf58784f2",
      //   },
      //   data: payload,
      // };

      newProductOrder = await axios
        .request(config)
        .then((response) => {
          console.log({
            message: "Product Order created for the second try in servicenow",
          });
          return response.data;
        })
        .catch((error) => {
          console.log({
            message:
              "Product Order not created for the second try in servicenow",
          });
          return { error };
        });
      if (newProductOrder.error) {
        res.status(500).send(
          JSON.stringify({
            message:
              "Error occured while creating a new product order in the servicenow instance",
          })
        );
      }
    }
  } catch (error) {
    return { error };
  }

  res.status(201).send(
    JSON.stringify({
      message: "New Product Order inserted in servicenow",
      productOrder: newProductOrder,
    })
  );
}
