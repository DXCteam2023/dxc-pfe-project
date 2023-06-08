import { Schema, model } from "mongoose";

type Channel = {
  id: string;
  name?: string;
};

type Note = {
  text: string;
};

enum Action {
  ADD = "add",
  CHANGE = "change",
  DELETE = "delete",
  DEFAULT = "",
}

type TaxIncludedAmount = {
  unit?: string;
  value?: string;
};

type Price = {
  taxIncludedAmount?: TaxIncludedAmount;
};

type ItemPrice = {
  price?: Price;
  priceType?: string;
  recurringChargePeriod?: string;
};

type Place = {
  id: string;
  "@type": string;
};

type ProductCharacterisic = {
  name?: string;
  previousValue?: string;
  value?: string;
};

type ProductSpecification = {
  id: string;
  internalVersion?: string;
  name?: string;
  version?: string;
  "@type": string;
};

type ProductRelatedParty = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  "@referredType": string;
  "@type": string;
};

type Product = {
  id: string;
  place?: Place;
  productCharacteristic?: ProductCharacterisic[];
  productSpecification: ProductSpecification;
  relatedParty?: ProductRelatedParty[];
  "@type": string;
};

type ProductOffering = {
  id: string;
  internalVersion?: string;
  name?: string;
  version?: string;
};

enum RelationshipType {
  HASCHILD = "HasChild",
  HASPARENT = "HasParent",
}

type ProductOrderItemRelationship = {
  id: string;
  relationshipType: RelationshipType;
};

type ProductOrderItem = {
  action: Action;
  id: string;
  itemPrice?: ItemPrice[];
  product: Product;
  productOffering: ProductOffering;
  productOrderItemRelationship: ProductOrderItemRelationship[];
  quantity?: number;
  state: string;
  "@type": string;
};

enum ReferredType {
  CUSTOMER = "Customer",
  CONTACT = "CustomerContact",
}

type RelatedParty = {
  id?: string;
  name?: string;
  "@referredType": ReferredType;
  "@type": string;
};

export interface IProductOrderDocument {
  channel: Channel[];
  externalId?: string;
  note?: Note[];
  orderCurrency: string;
  productOrderItem: ProductOrderItem[];
  relatedParty?: RelatedParty[];
  orderDate?: string;
  requestedCompletionDate?: string;
  requestedStartDate?: string;
  completionDate?: string;
  expectedCompletionDate?: string;
  ponr: boolean;
  state: string;
  "@type": string;
}

const channelSchema = new Schema({
  id: { type: String, required: true, default: "" },
  name: { type: String, required: false, default: "" },
});

const noteSchema = new Schema({
  text: { type: String, required: true, default: "" },
});

const taxIncludedAmoutSchema = new Schema({
  unit: { type: String, required: false },
  value: { type: Number, required: false },
});

const priceSchema = new Schema({
  taxIncludedAmout: { type: taxIncludedAmoutSchema, required: false },
});

const itemPriceSchema = new Schema({
  price: { type: priceSchema, required: false },
  priceType: { type: String, required: false },
  recurringChargePeriod: { type: String, required: false },
});

const placeSchema = new Schema({
  id: { type: String, required: true, default: "" },
  "@type": { type: String, required: true, default: "Place" },
});

const productCharacteristicSchema = new Schema({
  name: { type: String, required: false, default: "" },
  previousValue: { type: String, required: false, default: "" },
  value: { type: String, required: false, default: "" },
});

const productSpecificationSchema = new Schema({
  id: { type: String, required: true },
  internalVersion: { type: String, required: false },
  name: { type: String, required: false },
  version: { type: String, required: false },
  "@type": { type: String, required: true, default: "ProductSpecificationRef" },
});

const productRelatedPartySchema = new Schema({
  email: { type: String, required: false, default: "" },
  firstName: { type: String, required: false, default: "" },
  lastName: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  "@referredType": {
    type: String,
    required: true,
    default: "OrderLineItemContact",
  },
  "@type": { type: String, required: true },
});

const productSchema = new Schema({
  id: { type: String, required: true, default: "" },
  place: { type: placeSchema, required: false },
  productCharacteristic: {
    type: Array(productCharacteristicSchema),
    required: false,
  },
  productSpecification: { type: productSpecificationSchema, required: true },
  relatedParty: { type: Array(productRelatedPartySchema), required: false },
  "@type": { type: String, required: true },
});

const productOfferingSchema = new Schema({
  id: { type: String, required: true },
  internalVersion: { type: String, required: false },
  name: { type: String, required: false },
  version: { type: String, required: false },
});

const productOrderItemRelationshipSchema = new Schema({
  id: { type: String, required: true, default: "" },
  relationshipType: {
    type: String,
    enum: ["HasChild", "HasParent"],
    required: true,
  },
});

const productOrderItemSchema = new Schema({
  action: {
    type: String,
    enum: ["add", "change", "delete"],
    required: true,
    default: "",
  },
  id: { type: String, required: true, default: "" },
  itemPrice: { type: Array(itemPriceSchema), required: false },
  product: { type: productSchema, required: true },
  productOffering: { type: productOfferingSchema, required: true },
  productOrderItemRelationship: {
    type: Array(productOrderItemRelationshipSchema),
    required: true,
  },
  quantity: { type: Number, required: false, default: null },
  state: { type: String, required: true },
  "@type": { type: String, required: true, default: "ProductOrderItem" },
});

const relatedPartySchema = new Schema({
  id: { type: String, required: false },
  name: { type: String, required: false },
  "@referredType": {
    type: String,
    enum: ["Customer", "CustomerContact"],
    required: true,
  },
  "@type": { type: String, required: true, default: "RelatedParty" },
});

const productOrderSchema = new Schema({
  channel: { type: Array(channelSchema), required: false },
  externalId: { type: String, required: true, default: "" },
  note: { type: Array(noteSchema), required: false },
  orderCurrency: { type: String, required: true },
  productOrderItem: { type: Array(productOrderItemSchema), required: true },
  relatedParty: { type: Array(relatedPartySchema), required: false },
  orderDate: { type: String, required: false },
  requestedCompletionDate: { type: String, required: false, default: "" },
  requestedStartDate: { type: String, required: false, default: "" },
  completionDate: { type: String, required: false, default: "" },
  expectedCompletionDate: { type: String, required: false, default: "" },
  state: { type: String, required: true },
  ponr: { type: Boolean, required: true },
  "@type": { type: String, required: true, default: "ProductOrder" },
});

export const ProductOrder = model<IProductOrderDocument>(
  "ProductOrder",
  productOrderSchema
);
