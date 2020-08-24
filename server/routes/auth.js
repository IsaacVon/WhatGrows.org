const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { User } = require('../models/user')  




router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) return res.status(400).send(result.error.details[0].message);
    let user = await User.find({ email: req.body.email });
    user = user[0]    
    if (!user) return res.status(400).send("Invalid email or password.");
    const validPassword = await bcrypt.compare(req.body.password, user.password)    
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    // (insert payload, private key)
    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));

    res.send(token)    
  
});

module.exports = router;