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
  name?:string;
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
  // _id: string;
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
  status: string;
}

const categorySchema = new Schema({
  id: { type: String, required: false },
  name: { type: String, required: false, default: "" },
});

const channelSchema = new Schema({
  description: { type: String, required: false, default: "" },
  id: { type: String, required: false},
  name: { type: String, required: false, default: "" },
});

const productSpecCharacteristicSchema = new Schema({
  name: { type: String, required: false, default: "" },
  valueType: { type: String, required: false },
  productSpecCharacteristicValue: [{
    value: {
      type: String,
      required: false
    }
  }],
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
  id: { type: String, required: false },
  name: { type: String, required: false },
  internalId: { type: String, required: false },
  internalVersion: { type: String, required: false },
  version: { type: String, required: false },
});

const productSpecCharacteristicValueSchema = new Schema({
  value: { type: String, required: false}, 
});

const validForSchema = new Schema({
  endDateTime: { type: String, required: false, default: "" },
  startDateTime: { type: String, required: false, default: "" },
});

const prodSpecCharValueUseSchema = new Schema({
  productSpecCharacteristicValue: {
    type: Array(productSpecCharacteristicValueSchema),
    required: false,
  },
  description: { type: String, required: false, default: "" },
  name: { type: String, required: false },
  validFor: { type: validForSchema, required: false },
  valueType: { type: String, required: false },
});

const productOfferingSchema = new Schema({
  // _id: { type: String, required: false},
  number: { type: String, required: false }, //this
  category: { type: Array(categorySchema), required: false },
  channel: { type: Array(channelSchema), required: false },
  description: { type: String, required: false },
  externalId: { type: String, required: false, default: "" },
  id: { type: String, required: false},//this
  internalId: { type: String, required: false },
  lastUpdate: { type: String, required: false, default: "" },
  name: { type: String, required: false },
  productSpecCharacteristic: {
    type: Array(productSpecCharacteristicSchema),
    required: false,
  },
  productOfferingPrice: {
    type: Array(productOfferingPriceSchema),
    required: false,
  },
  productOfferingTerm: { type: String, required: false, default: "" },
  productSpecification: { type: productSpecificationSchema, required: false },
  prodSpecCharValueUse: {
    type: Array(prodSpecCharValueUseSchema),
    required: false,
  },
  validFor: { type: validForSchema, required: false },
  version: { type: String, required: false },
  status: { type: String, required: false }, //this
});

export const ProductOffering = model<IProductOfferingDocument>(
  "ProductOffering",
  productOfferingSchema
);