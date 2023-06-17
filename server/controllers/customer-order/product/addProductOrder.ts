import { Request, Response } from "express";
import axios from "axios";
import qs from "qs";
import { ProductOrder } from "../../../models/productOrder";
import { Data } from "../../../models/data";
import { ObjectId } from "mongodb";

export default async function addProductOrder(req: Request, res: Response) {
  try {
    const payload = req.body;

    const data = await Data.findOne({});

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

    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://dev106794.service-now.com/api/sn_ind_tmt_orm/order/productOrder",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          Cookie:
            "BIGipServerpool_dev106794=479287306.39742.0000; JSESSIONID=FFF7FFA9F19993F03C1B52F1A127A2AC; glide_user_activity=U0N2M18xOkg5b3NtbkxhSHEvaGU1ZmthdlB3QXd0MFo2TFNuSk1hekIyblRmTVFTSXc9OmVES2dEUi9aUUtPb095R2tuN2M3WXlsYkJDRDJhaXdNaUplOVg3dk54RTg9; glide_user_route=glide.0e34b6baadf33e7786d672daf58784f2",
        },
        data: payload,
      };

      newProductOrder = await axios
        .request(config)
        .then((response) => {
          console.log("Created in first try");
          return response.data;
        })
        .catch((error) => {
          console.log({ error, message: "Product not created in first try" });
          return null;
        });
      if (newProductOrder === null) {
        let oAuthData = qs.stringify({
          grant_type: "password",
          client_id: "165d875796032110d82e2905e02762ac",
          client_secret: "j6kdo+e$d-",
          username: "admin",
          password: "Fy-5j8Rlc*EF",
        });

        let oAuthTokenConfig = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://dev106794.service-now.com/oauth_token.do",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie:
              "BIGipServerpool_dev106794=479287306.39742.0000; JSESSIONID=FFF7FFA9F19993F03C1B52F1A127A2AC; glide_user_activity=U0N2M18xOkg5b3NtbkxhSHEvaGU1ZmthdlB3QXd0MFo2TFNuSk1hekIyblRmTVFTSXc9OmVES2dEUi9aUUtPb095R2tuN2M3WXlsYkJDRDJhaXdNaUplOVg3dk54RTg9; glide_user_route=glide.0e34b6baadf33e7786d672daf58784f2",
          },
          data: oAuthData,
        };

        const tokens = await axios
          .request(oAuthTokenConfig)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });

        // const oldToken = await Data.findOne({ access_token: access_token });

        // mongodbId = new ObjectId(oldToken._id);

        const newToken = await Data.findByIdAndUpdate(
          mongodbId,
          {
            access_token: tokens.access_token,
          },
          { new: true }
        );

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://dev106794.service-now.com/api/sn_ind_tmt_orm/order/productOrder",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken.access_token}`,
            Cookie:
              "BIGipServerpool_dev106794=479287306.39742.0000; JSESSIONID=FFF7FFA9F19993F03C1B52F1A127A2AC; glide_user_activity=U0N2M18xOkg5b3NtbkxhSHEvaGU1ZmthdlB3QXd0MFo2TFNuSk1hekIyblRmTVFTSXc9OmVES2dEUi9aUUtPb095R2tuN2M3WXlsYkJDRDJhaXdNaUplOVg3dk54RTg9; glide_user_route=glide.0e34b6baadf33e7786d672daf58784f2",
          },
          data: payload,
        };

        newProductOrder = await axios
          .request(config)
          .then((response) => {
            console.log("Created in second try");
            return response.data;
          })
          .catch((error) => {
            console.log("Product not created in second try");
            return { error };
          });
      }
    } catch (error) {
      return { error };
    }

    payload.externalId = newProductOrder.id;
    payload.state = newProductOrder.state;

    const productOrder = await ProductOrder.create(payload);

    const newData = await Data.findByIdAndUpdate(
      mongodbId,
      { order_number: order_number },
      { new: true }
    );

    console.log("Order number is:", newData.order_number);

    res.setHeader("Content-Type", "application/json");
    res.status(201).send(
      JSON.stringify({
        message: "New product order inserted",
        productOrder: productOrder,
        instancePayload: newProductOrder,
      })
    );
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send(JSON.stringify({ exeption: e }));
  }
}
