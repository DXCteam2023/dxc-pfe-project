"use client";

import {
  MdOutlinePublishedWithChanges,
  MdPublishedWithChanges,
} from "react-icons/md";
import { FormEventHandler, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrStatusDisabled, GrView } from "react-icons/gr";
import axios, { AxiosError } from "axios";
import * as dotenv from "dotenv";
import IProductOfferingDocument from "../../../../../server/models/product-offering/IProductOffering";
import Modal from "./Modal";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductProps {
  product: IProductOfferingDocument;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpenView, setModalOpenView] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductOfferingDocument[]>([]);
  const [productName, setProductName] = useState<String>(product.name);
  const [productDescription, setProductDescription] = useState<String>(
    product.description,
  );
  const [openModalRetired, setOpenModalRetired] = useState<boolean>(false);
  const [openModalPublish, setOpenModalPublish] = useState<boolean>(false);
  const [category, setCategory] = useState<{ id: string; name?: string }[]>(
    product.category,
  );
  const [channel, setChannel] = useState<{ id: string; name: string }[] | null>(
    null,
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [productSpecifications, setProductSpecifications] = useState<
    {
      _id: string;
      name: string;
      id: string;
      version: string;
      internalVersion: string;
      internalId: string;
    }[]
  >([]);
  const [chosenProductSpecification, setChosenProductSpecification] =
    useState("");
  const [selectedProductSpec, setSelectedProductSpec] = useState<{
    id: string;
    name: string;
    productSpecCharacteristic: Array<{
      name: string;
      valueType: string;
      productSpecCharacteristicValue: Array<{ value: string }>;
    }>;
  } | null>(null);

  const [productOfferingPrice, setProductOfferingPrice] = useState<{
    price: {
      taxIncludedAmount: {
        unit: string;
        value: string;
      };
    };
    priceType: string;
  }>({ price: { taxIncludedAmount: { unit: "", value: "" } }, priceType: "" });

  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    string[]
  >([]);
  const [selectedCharacteristicValues, setSelectedCharacteristicValues] =
    useState<Array<Array<string>>>([]);
  const [characteristics, setCharacteristics] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${AXIOS_URL}/api/product-offering/`)
        .then((data) => data.json())
        .catch((e) => console.log(e));
      console.log(res);
      setProducts(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductSpecifications();
  }, []);

  const fetchProductSpecifications = async () => {
    try {
      const url = `${AXIOS_URL}/api/product-specification`;
      const response = await axios.get(url);
      const data = response.data;
      setProductSpecifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEditProOf: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    try {
      // Make sure to replace the placeholders with the actual values
      const id = product.id;
      const po = {
        name: productName,
        description: productDescription,
        productSpecification: productSpecifications,
      };
      try {
        console.log("this id", id);
        const productOffering = await axios
          .get(`${AXIOS_URL}/api/product-offering/${id}`)
          .then((res) => res.data)
          .catch((e) => console.log(e));

        const poId = productOffering._id;
        console.log("PO ID:", poId);

        const updatePo = await axios
          .patch(`${AXIOS_URL}/api/product-offering/${poId}`, po)
          .then((res) => res.data)
          .catch((error) => console.log({ error }));

        console.log("Updated Product Offering:", updatePo);
        setModalOpen(false);
        window.location.reload();
      } catch (e) {
        console.log("Axios error:", e);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any other errors
    }
  };

  const handleSubmitEditPublish: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    try {
      // Make sure to replace the placeholders with the actual values
      const id = product.externalId;
      axios.patch(`${AXIOS_URL}/api/product-offering/${id}`);
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any other errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Response status:", axiosError.response.status);
          console.error("Response data:", axiosError.response.data);
        } else if (axiosError.request) {
          console.error("No response received:", axiosError.request);
        } else {
          console.error("Error setting up the request:", axiosError.message);
        }
      } else {
        console.error("Unkown error:", error);
      }
    }
  };

  const handleSubmitEditRe: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      // Make sure to replace the placeholders with the actual values
      const id = product.id;
      const po = {
        status: "Retired",
      };
      try {
        const productOffering = await axios
          .get(`${AXIOS_URL}/api/product-offering/${id}`)
          .then((res) => res.data)
          .catch((e) => console.log(e));

        const poId = productOffering._id;

        const updatePo = await axios
          .patch(`${AXIOS_URL}/api/product-offering/${poId}`, po)
          .then((res) => res.data)
          .catch((error) => console.log({ error }));

        console.log("Updated Product Offering:", updatePo);
        setModalOpen(false);
        window.location.reload();
      } catch (e) {
        console.log("Axios error:", e);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any other errors
    }
  };

  return (
    <tr key={product.id}>
      {/* <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => setModalOpenView(true)}
      >
        {product.number}
      </td> */}
      <td className="px-6 py-4">{product.name}</td>
      <td className="px-6 py-4">{product.description}</td>
      <td className="px-6 py-4">
        {product.productSpecification
          ? product.productSpecification.name
          : "Product Specification Name"}
      </td>
      <td className="px-6 py-4">{product.internalVersion}</td>
      <td className="px-6 py-4">{product.status}</td>
      <td className="px-6 py-4">{product.validFor.startDateTime}</td>
      <td
        className="px-6 py-4"
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* <FiEdit
          onClick={() => setModalOpen(true)}
          title="Edit"
          cursor="pointer"
          className="text-green-500"
          size={25}
        /> */}
        <button className="btn btn-sm btn-info" onClick={() => setModalOpen(true)}>Update</button>
        &nbsp;
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitEditProOf}>
            <h3 className="font-bold text-lg">Edit product</h3>
            <div className="grid">
              <div className="input-group grid my-3">
                <label htmlFor="product-offering-name" className="mb-2">
                  Display name
                </label>
                <input
                  value={productName.toString()}
                  onChange={(e) => setProductName(e.target.value)}
                  name="product-offering-name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="input-group grid my-3">
                <label htmlFor="product-specification" className="mb-2">
                  Product Specification
                </label>
                <select
                  name="product-specification"
                  id="prod-spec"
                  className="py-3 px-2 bg-white rounded flex items-center"
                >
                  {productSpecifications.map((prodSpec) => {
                    return (
                      <option value={prodSpec.name}>{prodSpec.name}</option>
                    );
                  })}
                </select>
              </div>
              <div className="grid">
                <div className="input-group grid my-3">
                  <label htmlFor="product-offering-name" className="mb-2">
                    Description
                  </label>
                  <input
                    value={productDescription.toString()}
                    onChange={(e) => setProductDescription(e.target.value)}
                    name="product-offering-des"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="btn">
                Update
              </button>
              &nbsp;
            </div>
          </form>
        </Modal>
        {product.status === "draft" || product.status === "In Draft" ? (
          // <MdOutlinePublishedWithChanges
          //   size={25}
          //   title="Publish"
          //   cursor="pointer"
          //   onClick={() => setOpenModalPublish(true)}
          // />
          <button className="btn btn-sm btn-success" onClick={() => setOpenModalPublish(true)} >Publish</button>
          
        ) : null}
        &nbsp;
        <Modal modalOpen={openModalPublish} setModalOpen={setOpenModalPublish}>
          <form onSubmit={handleSubmitEditPublish}>
            <h3 style={{ color: "black", textAlign: "center" }}>
              Are you sure, you want to Publish this product?
            </h3>
            <div className="modal-action">
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="button"
                onClick={() => setOpenModalPublish(false)}
                className="btn"
              >
                Cancel
              </button>
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="submit"
                className="btn"
              >
                Publish
              </button>
            </div>
          </form>
        </Modal>
        {product.status === "Published" || product.status === "published" ? (
          // <GrStatusDisabled
          //   size={25}
          //   title="Retire"
          //   cursor="pointer"
          //   onClick={() => setOpenModalRetired(true)}
          // />
          <button className="btn btn-sm btn-warning" onClick={() => setOpenModalRetired(true)}>Retire</button>
        ) : null}
        &nbsp;
        <Modal modalOpen={openModalRetired} setModalOpen={setOpenModalRetired}>
          <form onSubmit={handleSubmitEditRe}>
            <h3 style={{ color: "black", textAlign: "center" }}>
              Are you sure, you want to Retired this product?
            </h3>
            <div className="modal-action">
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="button"
                onClick={() => setOpenModalRetired(false)}
                className="btn"
              >
                Cancel
              </button>
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="submit"
                className="btn"
              >
                Retired
              </button>
            </div>
          </form>
        </Modal>
        {/* <GrView
          title="View"
          cursor="pointer"
          className="text-blue-500"
          size={25}
        /> */}
        <button className="btn btn-sm btn-active">View</button>
        <Modal modalOpen={modalOpenView} setModalOpen={setModalOpenView}>
          <form onSubmit={handleSubmitEditProOf}>
            <h3 className="font-bold text-lg">Product details</h3>
            <div className="grid">
              <div className="input-group grid my-3">
                <label htmlFor="product-offering-name" className="mb-2">
                  Display name
                </label>
                <input
                  value={productName.toString()}
                  onChange={(e) => setProductName(e.target.value)}
                  name="product-offering-name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
              <div className="input-group grid my-3">
                <label htmlFor="product-specification" className="mb-2">
                  Product Specification
                </label>
                <select
                  name="product-specification"
                  id="prod-spec"
                  className="py-3 px-2 bg-white rounded flex items-center"
                >
                  {productSpecifications.map((prodSpec) => {
                    return (
                      <option value={prodSpec.name}>{prodSpec.name}</option>
                    );
                  })}
                </select>
              </div>
              <div className="grid">
                <div className="input-group grid my-3">
                  <label htmlFor="product-offering-name" className="mb-2">
                    Description
                  </label>
                  <input
                    value={productDescription.toString()}
                    onChange={(e) => setProductDescription(e.target.value)}
                    name="product-offering-des"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div></div>
          </form>
        </Modal>
      </td>
    </tr>
  );
};
export default Product;
