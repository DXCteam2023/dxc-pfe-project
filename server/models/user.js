import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    userID: { type: "string", required: true },
    profile: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    date: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

export const User = mongoose.model("user", userSchema);

export const validation = (data) => {
    const Schema = Joi.object({
        userID: Joi.string().required().label("userID"),
        profile: Joi.string().required().label("profile"),
        email: Joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return Schema.validate(data);
};
