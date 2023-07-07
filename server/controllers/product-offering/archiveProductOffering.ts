import { Request, Response } from "express";
import DataModel from "../../models/data";
import { ObjectId } from "mongodb";
import axios from "axios";
import QueryString from "qs";

export default async function archiveProductOffering(
  req: Request,
  res: Response
) {
  const payload = req.body;
  const { id } = req.params;

  const data = await DataModel.findOne({});

  const access_token = data.access_token;

  let archivedProductOffering;
  const mongodbId: ObjectId = new ObjectId(data._id);

  res.setHeader("Content-Type", "application/json");

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://dev174830.service-now.com//api/sn_prd_pm_adv/catalogmanagement/archive_product_offering/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        Cookie:
          "BIGipServerpool_dev174830=495998730.35134.0000; JSESSIONID=A2E08104C4CC46B511A35B4E0CCF4EC5; glide_session_store=8D9179DB97EFAD10720F7A200153AFC8; glide_user_route=glide.dcbc4af8666824ee4372a55062687d69",
      },
    };

    archivedProductOffering = await axios
      .request(config)
      .then((response) => {
        console.log({
          message: "Product Offering archived for the first try in servicenow",
        });
        return response.data;
      })
      .catch((error) => {
        console.log({
          message:
            "Product Offering not archived for the first try in servicenow",
        });
        return { error };
      });
    if (archivedProductOffering.error) {
      let oAuthData = QueryString.stringify({
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

      const newToken = await DataModel.findByIdAndUpdate(
        mongodbId,
        {
          access_token: tokens.access_token,
        },
        { new: true }
      );

      config.headers.Authorization = `Bearer ${newToken.access_token}`;

      archivedProductOffering = await axios
        .request(config)
        .then((response) => {
          console.log({
            message:
              "Product Offering archived for the second try in servicenow",
          });
          return response.data;
        })
        .catch((error) => {
          console.log({
            message:
              "Product Offering not archived for the second try in servicenow",
          });
          return { error };
        });
      if (archivedProductOffering.error) {
        res.status(500).send(
          JSON.stringify({
            message:
              "Error occured while archiving the product offering in the servicenow instance",
          })
        );
      } else {
        res.status(201).send(
          JSON.stringify({
            message: "Product Offering archived in servicenow",
          })
        );
      }
    } else {
      res.status(201).send(
        JSON.stringify({
          message: "Product Offering archived in servicenow",
        })
      );
    }
  } catch (error) {
    return { error };
  }
}
