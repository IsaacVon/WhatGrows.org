const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 255 },
    password: { type: String, required: true, maxlength: 1024 },
    favorites: [
      {
        plantId: Number,
        common_name: String,
        notes: String,
        image: String,
        plantUrl: String,
      },
    ],
  })
);

// getUser - Input via req.params: id
router.get("/:id", async (req, res) => {
  id = req.params.id;
  const user = await User.find({ _id: id });
  res.send(user[0]);
});

// Register User - Input via req.body: name, email, password
router.post("/register", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const result = schema.validate(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const duplicateUser = await User.find({ email: req.body.email });

  if (duplicateUser[0])
    return res.status(409).send("Account already created using this email");

  const user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const newUser = await user.save();
  res.send(_.pick(newUser, ["name", "email"]));
});

// addFavorite - Input via req.body: id, plantObject
router.put("/", async (req, res) => {
  // Validate Data
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
    plantObject: {
      plantId: Joi.number().required(),
      common_name: Joi.string().max(255).required(),
      notes: Joi.string().max(5000),
      image: Joi.string().max(5000),
      plantUrl: Joi.string().max(5000),
    },
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  if (!result.error) {
    const user = await User.findByIdAndUpdate(
      req.body.id,
      {
        $push: {
          favorites: req.body.plantObject,
        },
      },
      { new: true }
    );

    res.send(user);
  }
});

// deleteFavorite - Input via req.body: id, plantMongoId
router.delete("/", async (req, res) => {
  // Validate DAta
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
    plantMongoId: Joi.string().max(255).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  if (!result.error) {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $pull: { favorites: { _id: req.body.plantMongoId } } },
      { new: true }
    );
    res.send(user);
  }
});

// deleteAllFavorites Input via req.body: id
router.delete("/favorites", async (req, res) => {
  // Validate DAta
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  if (!result.error) {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { favorites: [] } },
      { new: true }
    );
    res.send(user);
  }
});

module.exports = router;
