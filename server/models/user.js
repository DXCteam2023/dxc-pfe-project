const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


const userSchema = new mongoose.Schema({
    userID: {type: 'string', required : true},
    profile : {type: 'string', required : true},
    email : {type: 'string', required : true},
    password : {type: 'string', required : true},
    date : {type: Date, default: Date.now}
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
    return token;
};

const User = mongoose.model('user', userSchema);

const validation = (data) => {
    const Schema = Joi.object({
        userID : Joi.string().required().label("userID"),
        profile : Joi.string().required().label("profile"),
        email : Joi.string().required().label("Email"),
        password : passwordComplexity().required().label("Password"),
    });
    return Schema.validate(data);
};

module.exports = {User, validation};