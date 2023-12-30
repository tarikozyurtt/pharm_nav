const mongoose = require("mongoose");
/* PetSchema will correspond to a collection in your MongoDB database. */
const pharmacySchema = new mongoose.Schema(
  {
    location: {
      type: Object,
      default: {
        type: "Point",
        coordinates: [0, 0],
      },
    },
    ownerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    pharmImage: {
      type: String,
    },
    drugs: {
      type: Object,
      default: {
        pedifen: 0,
        aspirin: 0,
        parol: 0,
        brufen: 0,
        naprosyn: 0,
        prilosec: 0,
        zocor: 0,
        norvasc: 0,
        canesten: 0,
        dartin: 0,
        benadryl: 0,
        ase: 0,
        lopressor: 0,
        itor: 0,
        protonbe: 0,
        zantac: 0,
        olor: 0,
        prozac: 0,
        valu: 0,
        voltaren: 0,
        latace: 0,
        neurontin: 0,
      },
    },
    address: {
      type: Object,
    },
    description: {
      type: String,
    },
    phoneNum: {
      type: String,
    },
    rating: {
      type: Object,
      default: {
        totalRatings: 0,
        totalUsers: 0,
      },
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);
