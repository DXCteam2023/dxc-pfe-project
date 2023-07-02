import { NewCustomerOrderContextType } from "../context/new-customer-order-context";

const { v4: uuidv4 } = require("uuid");

const generateOneProductOrderItem = (offering: any) => {
  return {
    id: uuidv4(),
    action: "add",
    itemPrice: offering.productOfferingObject.productOfferingPrice,
    product: {
      place: {
        id: offering.locationId,
        "@type": "Place",
      },
      productCharacteristic:
        offering.productOfferingObject.prodSpecCharValueUse,
      productSpecification: {
        ...offering.productOfferingObject.productSpecification,
        "@type": "ProductSpecificationRef",
      },
      relatedParty: [
        {
          id: offering.id,
          firstName: offering.firstname,
          lastName: offering.lastname,
          email: offering.email,
          phone: offering.mobilenumber,
          "@referredType": "RelatedParty",
          "@type": "OrderLineItemContact",
        },
      ],
      "@type": "Product",
    },
    productOffering: {
      id: offering.value,
      name: offering.label,
    },
    productOrderItemRelationship: [],
    quantity: offering.quantity,
    "@type": "ProductOrderItem",
  };
};

const generateCreateOrderRequestBody = (
  myContext: NewCustomerOrderContextType,
) => {
  const allProductOfferings = myContext.productOrders.flatMap((productOrder) =>
    productOrder.offerings.map((offering) => ({
      ...offering,
      locationId: productOrder.locationId,
      id: myContext.contact.value,
      firstname: productOrder.firstname,
      lastname: productOrder.lastname,
      email: productOrder.email,
      mobilenumber: productOrder.mobilenumber,
    })),
  );

  const channelsWithDuplicatedChannels = allProductOfferings.flatMap(
    (productOffering) => productOffering.productOfferingObject.channel,
  );

  const uniqueChannels = channelsWithDuplicatedChannels.filter(
    (oneChannel, index, array) =>
      array.findIndex((oneChannel2) => oneChannel2.id === oneChannel.id) ===
      index,
  );

  return {
    orderCurrency: "USD",
    channel: uniqueChannels,
    externalId: "",
    productOrderItem: allProductOfferings.map(generateOneProductOrderItem),
    relatedParty: [
      {
        id: myContext.account.value,
        name: myContext.account.label,
        "@type": "RelatedParty",
        "@referredType": "Customer",
      },
      {
        id: myContext.contact.value,
        name: myContext.contact.label,
        "@type": "RelatedParty",
        "@referredType": "CustomerContact",
      },
    ],
    "@type": "ProductOrder",
  };
};

export default generateCreateOrderRequestBody;
