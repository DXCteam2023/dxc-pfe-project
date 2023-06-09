import mongoose from "mongoose";
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
