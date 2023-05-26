const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {User, validation} = require('../models/user');
const Joi = require('joi');


router.post("/register", async(req, res) => {
    try {
        const {error} = validation(req.body);

        if (error) {
            return res.status(400).send({message: error.message})
        }
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(409).send({message: "User with given email already exists !"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT_KEY));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: 'User created successfully, Go to Login '})

    } catch (error) {
        res.status(500).send({message: "Internal server Error - users"})
        //console.log(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send({message: error.message});
        }

        const user = await User.findOne({email: req.body.email});
        //console.log(user);
        if (!user) {
            return res.status(401).send({message: "Invalid Email !!"});
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if (!validPassword) {
            return res.status(401).send({message: "Invalid Password !!"});
        }

        if (user.profile == "admin"){
            const token = user.generateAuthToken();
            res.status(200).send({data: token, user: user, message: "Login successful for admin"});
        }
        if (user.profile == "commercial agent"){
            const token = user.generateAuthToken();
            res.status(200).send({data: token, user: user, message: "Login successful for commercial agent"});
        }

        if (user.profile == "product catalog manager"){
            const token = user.generateAuthToken();
            res.status(200).send({data: token, user: user, message: "Login successful for product catalog manager"});
        }
        
        
        //res.send(user);
        // res.send(users)

    } catch (error) {
        res.status(500).send({message: error.message +" - "+ req.body});
    }
})
const validate = (data)=>{
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = router;