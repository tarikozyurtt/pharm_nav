const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supportSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  pharmacistName: {
    type: String,
  },
  pharmacyName: {
    type: String,
  },
});

module.exports = mongoose.model("Support", supportSchema);