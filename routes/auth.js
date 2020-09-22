const express = require('express');
const router = express.Router();
const User = require('../models/User')
//validation
const Joi = require('@hapi/joi')
const {loginValidation} = require("../utils/validation");
const {registrationValidation} = require('../utils/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) =>{

    //validate

        const {error} =  registrationValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const emailExist = await User.findOne({ email : req.body.email});

    if(emailExist) return res.status(400).send('Email Already exists');


    try{
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
            const savedUser = await user.save();
            res.send({user : savedUser._id});
    }catch (err){
            res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {

    const {error} = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email : req.body.email});
    if(!user) return res.status(400).send('Email not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).send('Invalid password');

    //create a jwt
    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_TOKEN_SECRET)

    res.header('auth-token', token).send('Logged In')

})


module.exports = router;
