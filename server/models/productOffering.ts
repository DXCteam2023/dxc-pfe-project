import { Schema, model } from "mongoose";

type Category = {
  id: string;
  name?: string;
};

type Channel = {
  description?: string;
  id: string;
  name?: string;
};

type ProductCharacteristic = {
  name?: string;
  value?: string;
};

type TaxIncludedAmount = {
  unit?: string;
  value?: string;
};

type Price = {
  taxIncludedAmount: TaxIncludedAmount;
};

type ProductOfferingPrice = {
  price?: Price;
  priceType?: string;
};

type ProductSpecification = {
  id: string;
  name: string;
  internalId?: string;
  internalVersion?: string;
  version?: string;
};

type ProductSpecCharacteristicValue = {
  value: string;
};

type ValidFor = {
  endDateTime?: string;
  startDateTime?: string;
};

type ProdSpecCharValueUse = {
  productSpecCharacteristicValue: ProductSpecCharacteristicValue[];
  description?: string;
  name: string;
  validFor?: ValidFor;
  valueType?: string;
};
export interface IProductOfferingDocument {
  number: string;
  category: Category[];
  channel: Channel[];
  description: string;
  externalId?: string;
  id: string;
  internalId: string;
  internalVersion?: string;
  lastUpdate?: string;
  name: string;
  productCharacteristic: ProductCharacteristic[];
  productOfferingPrice: ProductOfferingPrice[];
  productOfferingTerm?: string;
  productSpecification: ProductSpecification;
  prodSpecCharValueUse?: ProdSpecCharValueUse[];
  validFor: ValidFor;
  version?: string;
  state: string;
}

const categorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: false, default: "" },
});

const channelSchema = new Schema({
  description: { type: String, required: false, default: "" },
  id: { type: String, required: true },
  name: { type: String, required: false, default: "" },
});

const productCharacteristicSchema = new Schema({
  name: { type: String, required: false, default: "" },
  value: { type: String, required: false, default: "" },
});

const taxIncludedAmountSchema = new Schema({
  unit: { type: String, required: false },
  value: { type: String, required: false },
});

const priceSchema = new Schema({
  taxIncludedAmount: { type: taxIncludedAmountSchema, required: false },
});

const productOfferingPriceSchema = new Schema({
  price: {
    type: priceSchema,
    enum: ["nonRecurring", "recurring"],
    required: false,
  },
  priceType: { type: String, required: false },
});

const productSpecificationSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  internalId: { type: String, required: false },
  internalVersion: { type: String, required: false },
  version: { type: String, required: false },
});

const productSpecCharacteristicValueSchema = new Schema({
  value: { type: String, required: true },
});

const validForSchema = new Schema({
  endDateTime: { type: String, required: false, default: "" },
  startDateTime: { type: String, required: false, default: "" },
});

const prodSpecCharValueUseSchema = new Schema({
  productSpecCharacteristicValue: {
    type: Array(productSpecCharacteristicValueSchema),
    required: true,
  },
  description: { type: String, required: false, default: "" },
  name: { type: String, required: true },
  validFor: { type: validForSchema, required: false },
  valueType: { type: String, required: false },
});

const productOfferingSchema = new Schema({
  number: { type: String, required: true },
  category: { type: Array(categorySchema), required: false },
  channel: { type: Array(channelSchema), required: true },
  description: { type: String, required: true },
  externalId: { type: String, required: false, default: "" },
  id: { type: String, required: true },
  internalId: { type: String, required: false },
  lastUpdate: { type: String, required: false, default: "" },
  name: { type: String, required: true },
  productCharacteristic: {
    type: Array(productCharacteristicSchema),
    required: false,
  },
  productOfferingPrice: {
    type: Array(productOfferingPriceSchema),
    required: false,
  },
  productOfferingTerm: { type: String, required: false, default: "" },
  productSpecification: { type: productSpecificationSchema, required: true },
  prodSpecCharValueUse: {
    type: Array(prodSpecCharValueUseSchema),
    required: false,
  },
  validFor: { type: validForSchema, required: true },
  version: { type: String, required: false },
  state: { type: String, required: true },
});

export const ProductOffering = model<IProductOfferingDocument>(
  "ProductOffering",
  productOfferingSchema
);
