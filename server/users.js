const mongoose = require('mongoose');
const Joi = require("joi");
const express = require("express");
const app = express();


mongoose.connect('mongodb://localhost/')
app.use(express.json()); // Needed for req.body json body parser

// getUser
app.get("/api/users/:id", (req, res) => {
  // Input: id
  id = req.params.id;

  // put id into function
  // res.send output of function
  res.send(id);
});

// createUser
// Input: name, email, password
app.post("/api/users", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  // put req.body into function
  // res.send output of function
  res.send(result);
});

// addFavorite
// Input: id, plantObject
app.put("/api/user/", (req, res) => {
  // Validate DAta
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
  // put req.body into function
  // res.send output of function
  res.send(result);
});

// deleteFavorite
// Input: id, plantMongoId
app.delete("/api/user/", (req, res) => {
  // Validate DAta
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
    plantMongoId: Joi.string().max(255).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  // put req.body into function
  // res.send output of function
  res.send(result);
});

// deleteAllFavorites
// Input: id
app.delete("/api/user/favorites", (req, res) => {
  // Validate DAta
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  // put req.body into function
  // res.send output of function
  res.send(result);
});

// Edit Favorite

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
