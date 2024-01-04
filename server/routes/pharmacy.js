const express = require("express");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/users");
const bcrypt = require("bcrypt");
const connectDB = require("../helpers/dbMongoose");
const codeSchema = require("../models/codeSchema");
const pharmacySchema = require("../models/pharmacySchema");
const { default: mongoose } = require("mongoose");
const auth = require("../middleware/auth");

const router = express.Router();
require("dotenv").config();

router.post("/pharmacy", auth, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    await connectDB();
    const { code, location, userId } = req.body;
    if (!location) {
      return res.status(401).json({ message: "Location not found" });
    }
    let codeData = await codeSchema.findOne({ code: code });
    if (!codeData) {
      return res.status(401).json({ message: "Code is incorrect" });
    }
    if (!userId) {
      return res.status(401).json({ message: "User not found" });
    }

    const { drugs } = codeData;
    await userSchema.findOneAndUpdate(
      {
        _id: userId,
        "pastPrescriptions.code": { $ne: code },
      },
      {
        $push: {
          pastPrescriptions: {
            code: code,
            drugs: drugs,
          },
        },
      }
    );
    const matchConditions = Object.keys(drugs).reduce((acc, drug) => {
      acc[`drugs.${drug}`] = { $gt: drugs[drug] };
      return acc;
    }, {});
    let pipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: 5000,
        },
      },
      {
        $match: matchConditions,
      },
      {
        $project: {
          pharmImages: 1,
          name: 1, // Include the entire drugs object in the output
          location: 1,
          distance: 1,
          rating: 1,
          _id: 1,
          isPremium: 1,
        },
      },
    ];

    let pharmacyData = await pharmacySchema.aggregate(pipeline);
    pipeline[1].$match.isPremium = true;
    let premiumPharmacies = await pharmacySchema.aggregate(pipeline);

    // Return the token as JSON
    res.status(200).json({
      pharmacyData: {
        premiumPharmacies: premiumPharmacies ?? [],
        pharmacies: pharmacyData ?? [],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/pharmacyinfo", auth, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    await connectDB();

    const { pharmId } = req.body;
    let pharmacyData = await pharmacySchema.findById(pharmId);
    if (!pharmacyData) {
      return res.status(500).json({ message: "Pharmacy not found" });
    }
    pharmacyData.comments = pharmacyData.comments.reverse();
    res.status(200).json({
      pharmacyData: pharmacyData ?? [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Pharmacy not found" });
  }
});

router.post("/addcomment", auth, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    await connectDB();

    const { pharmId, comment, patientId } = req.body;
    /*
    {
      name:"user1"
      comment: "Very good pharmacy",
    }
  */
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(401).json({ message: "Invalid patientId" });
    }

    if (!mongoose.Types.ObjectId.isValid(pharmId)) {
      return res.status(401).json({ message: "Invalid pharmId" });
    }
    let patient = await userSchema.findById(patientId);
    if (!patient) {
      return res.status(401).json({ message: "Patient not found" });
    }

    let pharmacyData = await pharmacySchema.findOneAndUpdate(
      { _id: pharmId },
      {
        $push: {
          comments: {
            content: comment,
            user_name: patient.name,
          },
        },
      },
      { returnOriginal: false }
    );
    if (!pharmacyData) {
      return res.status(401).json({ message: "Pharmacy not found" });
    }

    res.status(200).json({
      pharmacyData: pharmacyData?.comments ?? [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    await connectDB();

    const { drugs, pharmId } = req.body;

    let pharmacyData = await pharmacySchema.findById(pharmId);
    if (!pharmacyData) {
      return res.status(401).json({ message: "Pharmacy not found" });
    }

    let bulkOperations = [];
    for (let [drugName, quantityChange] of Object.entries(drugs)) {
      if (pharmacyData.drugs[drugName] == undefined) {
        return res
          .status(401)
          .json({ success: false, message: "Drug in request not found" });
      }
      if (pharmacyData.drugs[drugName] + quantityChange < 0) {
        return res
          .status(401)
          .json({ success: false, message: "Stock can not be negative" });
      }
      let drugField = `drugs.${drugName}`;
      bulkOperations.push({
        updateOne: {
          filter: { _id: pharmId },
          update: {
            $inc: {
              [drugField]: quantityChange,
            },
          },
        },
      });
    }

    await pharmacySchema.bulkWrite(bulkOperations);

    let newData = await pharmacySchema.findById(pharmId);

    res.status(200).json({
      success: true,
      pharmacyData: newData ?? [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/addrating", auth, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    await connectDB();

    const { pharmId, rating, userId } = req.body;

    let pharmacyData = await pharmacySchema.findOneAndUpdate(
      { _id: pharmId, "rating.raters": { $ne: userId } },
      {
        $inc: {
          "rating.totalRatings": rating,
        },
        $push: {
          "rating.raters": userId,
        },
      },
      {
        new: true,
      }
    );
    if (!pharmacyData) {
      return res.status(401).json({ message: "Error on user or pharmacy" });
    }
    pharmacyData.rating.totalRatings = (
      pharmacyData.rating.totalRatings / pharmacyData.rating.raters.length
    ).toFixed(2);

    res.status(200).json({
      pharmacyData: pharmacyData ?? [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/getPharmDetail", auth, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const userId = req.query.userId;
    await connectDB();
    let pharmacy = await pharmacySchema.findOne({ ownerId: userId });
    if (!pharmacy) {
      return res.status(401).json({ message: "Pharmacy not found" });
    } else {
      return res.status(200).json(pharmacy);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
