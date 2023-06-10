import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

interface IUserDocument {
    userID: string,
    password : string,
    profile : string,
    username : string,
    role : string,
    createdAt : Date,
    generateAuthToken() : string
}

const userSchema = new mongoose.Schema({
    userID: { type: "string", required: true },
    password: { type: "string", required: true },
    profile: { type: "string", required: true },
    username: { type: "string", required: true },
    role: { type: "string", required: true },
    createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "1d",
    });
    return token;
};

export const User = mongoose.model<IUserDocument>("users", userSchema);

export const validation = (data) => {
    const Schema = Joi.object({
        userID: Joi.string().required().label("userID"),
        profile: Joi.string().required().label("profile"),
        username: Joi.string().required().label("username"),
        password: passwordComplexity().required().label("Password"),
        role: Joi.string().required().label("role")
    });
    return Schema.validate(data);
};
=======
type Order = {
  orderNumber: string;
  id: string;
  productOfferings: string[];
  state: string;
  orderDate: string;
  type: string;
};

type ProductOffering = {
  number: string;
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  contractTerm: string;
  state: string;
};
export interface IUserDocument {
  userID: string;
  username: string;
  password: string;
  profile: string;
  role: string;
  createdAt: Date;
  orders?: Order[];
  totalOrders?: number;
  productOfferings?: ProductOffering[];
  totalProductOfferings?: number;
  generateAuthToken(): string;
}

const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  id: { type: String, required: true },
  productOfferings: { type: Array(String), required: true },
  state: { type: String, required: true },
  orderDate: { type: String, required: true },
  type: { type: String, required: true },
});

const productOfferingSchema = new Schema({
  number: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  contractTerm: { type: String, required: true },
  state: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  userID: { type: "string", required: true },
  password: { type: "string", required: true },
  profile: { type: "string", required: true },
  username: { type: "string", required: true },
  role: { type: "string", required: true },
  createdAt: { type: Date, default: Date.now },
  orders: { type: Array(orderSchema), required: false },
  totalOrders: { type: Number, required: false, default: 0 },
  productOfferings: { type: Array(productOfferingSchema), required: false },
  totalProductOfferings: { type: Number, required: false, default: 0 },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "1d",
  });
  return token;
};

export const validation = (data: {
  userID: string;
  profile: string;
  username: string;
  password: string;
  role: string;
}) => {
  const Schema = Joi.object({
    userID: Joi.string().required().label("userID"),
    profile: Joi.string().required().label("profile"),
    username: Joi.string().required().label("username"),
    password: passwordComplexity().required().label("Password"),
    role: Joi.string().required().label("role"),
  });
  return Schema.validate(data);
};

export const User = model<IUserDocument>("User", userSchema);
