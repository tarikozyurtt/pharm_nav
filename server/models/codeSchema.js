const mongoose = require("mongoose");
/* PetSchema will correspond to a collection in your MongoDB database. */
const codeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    drugs: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("codeSchema", codeSchema);
