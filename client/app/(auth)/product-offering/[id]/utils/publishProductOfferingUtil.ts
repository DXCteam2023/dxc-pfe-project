import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const publishProductOffering = (id: string) => {
  try {
    axios
      .patch(`${AXIOS_URL}/api/product-offering/publish/servicenow/${id}`)
      .then(() => console.log("Product Offering has been published"))
      .catch(() =>
        console.log("There was an error while publishing the product offering"),
      );
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } catch (e) {
    console.log(e);
  }
};

export default publishProductOffering;
