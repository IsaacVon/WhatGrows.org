const mongoose = require("mongoose");

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

exports.User = User;