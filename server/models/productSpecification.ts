import { Schema, model } from "mongoose";

type ProductSpecCharacteristicValue = {
  value: string;
};

type ValidFor = {
  endDateTime?: string;
  startDateTime?: string;
};

type ProductSpecCharacteristic = {
  description?: string;
  name: string;
  productSpecCharacteristicValue: ProductSpecCharacteristicValue[];
  validFor?: ValidFor;
  valueType?: string;
};

enum RelationshipType {
  COMPOSED_OF = "composed_of",
  BUNDLES = "bundles",
}

type ProductSpecificationRelationship = {
  id?: string;
  type: RelationshipType;
  validFor?: ValidFor;
};

type ResourceSpecification = {
  id: string;
  internalId?: string;
  internalVersion?: string;
  name?: string;
  version?: string;
};

type ServiceSpecification = {
  id?: string;
  internalId?: string;
  internalVersion?: string;
  name?: string;
  version?: string;
};
export interface IProductSpecificationDocument {
  description: string;
  externalId?: string;
  id: string;
  internalId?: string;
  internalVersion?: string;
  lastUpdate?: string;
  name: string;
  productSpecCharacteristic?: ProductSpecCharacteristic[];
  productSpecificationRelationship?: ProductSpecificationRelationship[];
  resourceSpecification: ResourceSpecification[];
  serviceSpecification?: ServiceSpecification[];
  validFor: ValidFor;
  version?: string;
}

const productSpecCharacteristicValueSchema = new Schema({
  value: { type: String, required: true },
});

const validForSchema = new Schema({
  endDateTime: { type: String, required: false, default: "" },
  startDateTime: { type: String, required: false, default: "" },
});

const productSpecCharacteristic = new Schema({
  description: { type: String, required: false, default: "" },
  name: { type: String, required: true },
  productSpecCharacteristicValue: {
    type: Array(productSpecCharacteristicValueSchema),
    required: true,
  },
  validFor: { type: validForSchema, required: false },
  valueType: { type: String, required: false },
});

const productSpecificationRelationshipSchema = new Schema({
  id: { type: String, required: false, default: "" },
  type: { type: String, enum: ["composed_of", "bundles"], required: true },
  validFor: { type: validForSchema, required: false },
});

const resourceSpecificationSchema = new Schema({
  id: { type: String, required: true },
  internalId: { type: String, required: false },
  internalVersion: { type: String, required: false },
  name: { type: String, required: false },
  version: { type: String, required: false },
});

const serviceSpecificationSchema = new Schema({
  id: { type: String, required: false },
  internalId: { type: String, required: false },
  internalVersion: { type: String, required: false },
  name: { type: String, required: false },
  version: { type: String, required: false },
});

const productSpecificationSchema = new Schema({
  description: { type: String, required: true },
  externalId: { type: String, required: false, default: "" },
  id: { type: String, required: true },
  internalId: { type: String, required: false },
  internalVersion: { type: String, required: false },
  lastUpdate: { type: String, required: false, default: "" },
  name: { type: String, required: true },
  productCharacteristic: {
    type: Array(productSpecCharacteristic),
    required: false,
  },
  productSpecificationRelationship: {
    type: Array(productSpecificationRelationshipSchema),
    required: false,
  },
  resourceSpecification: {
    type: Array(resourceSpecificationSchema),
    required: true,
  },
  serviceSpecification: {
    type: Array(serviceSpecificationSchema),
    required: false,
  },
  validFor: { type: validForSchema, required: true },
  version: { type: String, required: false },
  state: { type: String, required: false },
});

export const ProductSpecification = model<IProductSpecificationDocument>(
  "ProductSpecification",
  productSpecificationSchema
);
