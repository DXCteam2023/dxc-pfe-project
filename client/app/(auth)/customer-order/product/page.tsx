import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import Header from "../../dashboard/components/header/Header";
import Footer from "../../dashboard/components/Footer";
import ProductOrders from "./components/ProductOrders";
import Sidebar from "../../dashboard/components/Sidebar";

const productOrderPayload = {
  requestedCompletionDate: "2021-05-02T08:13:59.506Z",
  requestedStartDate: "2020-05-03T08:13:59.506Z",
  orderDate: "2020-05-03T08:13:59.506Z",
  externalId: "PO-00001",
  orderCurrency: "USD",
  note: [
    {
      id: "1",
      author: "Jean Pontus",
      date: "2019-04-30T08:13:59.509Z",
      text: "This is a TMF product order illustration",
    },
    {
      id: "2",
      author: "Jean Pontus1",
      date: "2019-04-30T08:13:59.509Z",
      text: "This is a TMF product order illustration no 2",
    },
  ],
  productOrderItem: [
    {
      id: "100",
      quantity: 1,
      action: "add",
      product: {
        isBundle: false,
        "@type": "Product",
        productSpecification: {
          id: "cfe5ef6a53702010cd6dddeeff7b12f6",
          name: "SD-WAN Service Package",
          "@type": "ProductSpecificationRef",
        },
        relatedParty: [
          {
            firstName: "John",
            lastName: "Smith",
            email: "abc2@example.com",
            phone: "32456768",
            "@type": "RelatedParty",
            "@referredType": "OrderLineItemContact",
          },
        ],
        productRelationship: [
          {
            id: "be6d13f45b5620102dff5e92dc81c781",
            relationshipType: "Requires",
          },
        ],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "110",
          relationshipType: "HasChild",
        },
        {
          id: "120",
          relationshipType: "HasChild",
        },
        {
          id: "130",
          relationshipType: "HasChild",
        },
      ],
      "@type": "ProductOrderItem",
    },
    {
      id: "110",
      quantity: 1,
      action: "add",
      itemPrice: [
        {
          description: "Access Fee",
          name: "Access Fee",
          priceType: "nonRecurring",
          price: {
            taxRate: 0,
            dutyFreeAmount: {
              unit: "USD",
              value: 100,
            },
            taxIncludedAmount: {
              unit: "USD",
              value: 220,
            },
          },
        },
      ],
      product: {
        isBundle: false,
        "@type": "Product",
        productCharacteristic: [
          {
            name: "Tenancy",
            valueType: "string",
            value: "Premium (>50 sites)",
          },
        ],
        productSpecification: {
          id: "216663aa53702010cd6dddeeff7b12b5",
          name: "SD-WAN Controller",
          "@type": "ProductSpecificationRef",
        },
        place: {
          "@type": "Place",
          id: "5671dd2ec3a53010188473ce3640dd81",
        },
        relatedParty: [
          {
            firstName: "John",
            lastName: "Smith",
            email: "abc2@example.com",
            phone: "32456768",
            "@type": "RelatedParty",
            "@referredType": "OrderLineItemContact",
          },
        ],
        productRelationship: [
          {
            id: "be6d13f45b5620102dff5e92dc81c781",
            relationshipType: "Requires",
          },
        ],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "100",
          relationshipType: "HasParent",
        },
      ],
      "@type": "ProductOrderItem",
    },
    {
      id: "120",
      action: "add",
      quantity: 1,
      itemPrice: [
        {
          description: "Tariff plan monthly fee",
          name: "MonthlyFee",
          priceType: "recurring",
          recurringChargePeriod: "month",
          price: {
            taxRate: 0,
            dutyFreeAmount: {
              unit: "USD",
              value: 300,
            },
            taxIncludedAmount: {
              unit: "USD",
              value: 349,
            },
          },
        },
      ],
      product: {
        isBundle: false,
        "@type": "Product",
        productCharacteristic: [
          {
            name: "CPE Model",
            valueType: "string",
            value: "ASR",
          },
          {
            name: "WAN Optimization",
            valueType: "string",
            value: "Advance",
          },
          {
            name: "CPE Type",
            valueType: "string",
            value: "Physical",
          },
          {
            name: "Routing",
            valueType: "string",
            value: "Premium",
          },
        ],
        productSpecification: {
          id: "39b627aa53702010cd6dddeeff7b1202",
          name: "SD-WAN Edge Device",
          "@type": "ProductSpecificationRef",
        },
        place: {
          "@type": "Place",
          id: "5671dd2ec3a53010188473ce3640dd81",
        },
        relatedParty: [
          {
            firstName: "John",
            lastName: "Smith",
            email: "abc2@example.com",
            phone: "32456768",
            "@type": "RelatedParty",
            "@referredType": "OrderLineItemContact",
          },
        ],
        productRelationship: [
          {
            id: "be6d13f45b5620102dff5e92dc81c781",
            relationshipType: "Requires",
          },
        ],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "100",
          relationshipType: "HasParent",
        },
      ],
      "@type": "ProductOrderItem",
    },
    {
      id: "130",
      quantity: 1,
      action: "add",
      itemPrice: [
        {
          description: "Tariff plan monthly security",
          name: "MonthlySecurity",
          priceType: "nonRecurring",
          recurringChargePeriod: "month",
          price: {
            taxRate: 0,
            dutyFreeAmount: {
              unit: "USD",
              value: 30,
            },
            taxIncludedAmount: {
              unit: "USD",
              value: 30,
            },
          },
        },
      ],
      product: {
        isBundle: false,
        "@type": "Product",
        productCharacteristic: [
          {
            name: "Security Type",
            valueType: "string",
            value: "Premium",
          },
        ],
        productSpecification: {
          id: "a6514bd3534560102f18ddeeff7b1247",
          name: "SD-WAN Security",
          "@type": "ProductSpecificationRef",
        },
        place: {
          "@type": "Place",
          id: "5671dd2ec3a53010188473ce3640dd81",
        },
        relatedParty: [
          {
            firstName: "John",
            lastName: "Smith",
            email: "abc2@example.com",
            phone: "32456768",
            "@type": "RelatedParty",
            "@referredType": "OrderLineItemContact",
          },
        ],
        productRelationship: [
          {
            id: "be6d13f45b5620102dff5e92dc81c781",
            relationshipType: "Requires",
          },
        ],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "100",
          relationshipType: "HasParent",
        },
      ],
      "@type": "ProductOrderItem",
    },
  ],
  relatedParty: [
    {
      id: "eaf68911c35420105252716b7d40ddde",
      name: "Sally Thomas",
      "@type": "RelatedParty",
      "@referredType": "CustomerContact",
    },
    {
      id: "ffc68911c35420105252716b7d40dd55",
      name: "Funco Intl",
      "@type": "RelatedParty",
      "@referredType": "Customer",
    },
  ],
  "@type": "ProductOrder",
};

const [newProduct, setNewProduct] = useState(0);

const handleProductOrderCreation = () => {
  setNewProduct(newProduct + 1);
};

useEffect(() => {
  const createProductOrder = async () => {
    const newProductOrder = await axios.post(
      "https://dxc-pfe-project-server/api/customer-order/product",
      productOrderPayload,
    );
    console.log(newProductOrder);
  };
  createProductOrder();
}, [newProduct]);

export default function ProductCustomerOrdersPage() {
  return (
    <div className="product-customer-orders">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          <ProductOrders />
          <Footer />
        </div>
        <button onClick={() => handleProductOrderCreation()}>
          Create Product Order
        </button>
      </div>
    </div>
  );
}
