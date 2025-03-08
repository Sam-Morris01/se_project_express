const mongoose = require("mongoose");
const validator = require("validator");

const clothingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the User model
    required: true,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "cold", "warm"], // Types of weather in WTWR
  },
  imageUrl: {
    type: String,
    validate: {
      // validating that the URL is in the correct format
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

const Item = mongoose.model("Item", clothingSchema);

module.exports = Item;
