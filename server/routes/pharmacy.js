const express = require("express");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/users");
const bcrypt = require("bcrypt");
const connectDB = require("../helpers/dbMongoose");
const codeSchema = require("../models/codeSchema");
const pharmacySchema = require("../models/pharmacySchema");
const router = express.Router();
require("dotenv").config();

router.post("/pharmacy", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  await connectDB();
  const { code, location } = req.body;
  let codeData = await codeSchema.findOne({ code: code });
  if (!codeData) {
    return res.status(401).json({ message: "Code is incorrect" });
  }

  const { drugs } = codeData;
  await userSchema.findOneAndUpdate(
    {
      _id: codeData.patientId,
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
      },
    },
    {
      $match: matchConditions,
    },
    {
      $project: {
        pharmImage: 1,
        name: 1, // Include the entire drugs object in the output
        location: 1,
        distance: 1,
        rating: 1,
        _id: 1
      },
    },
  ];

  let pharmacyData = await pharmacySchema.aggregate(pipeline);
  // Return the token as JSON
  res.status(200).json({
    pharmacyData: pharmacyData,
  });
});


router.post("/pharmacyinfo", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  await connectDB();

  const { pharmId } = req.body;
  let pharmacyData = await pharmacySchema.findById(pharmId);
  if (!pharmacyData) {
    return res.status(401).json({ message: "Pharmacy not found" });
  }
  res.status(200).json({
    pharmacyData: pharmacyData ?? [],
  });
});

router.post("/addcomment", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  await connectDB();

  const { pharmId, comment } = req.body;
  /*
    {
      name:"user1"
      comment: "Very good pharmacy",
    }
  */
  let pharmacyData = await pharmacySchema.findOneAndUpdate(
    { _id: pharmId },
    {
      $push: {
        comments: comment,
      },
    }
  );
  if (!pharmacyData) {
    return res.status(401).json({ message: "Pharmacy not found" });
  }

  res.status(200).json({
    pharmacyData: pharmacyData?.comments ?? [],
  });
});
router.post("/update", async (req, res) => {
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
    if (!pharmacyData.drugs[drugName]) {
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
});

router.post("/addrating", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  await connectDB();

  const { pharmId, rating } = req.body;

  let pharmacyData = await pharmacySchema.findOneAndUpdate(
    { _id: pharmId },
    {
      $inc: {
        "rating.totalRatings": rating,
        "rating.totalUsers": 1,
      },
    }
  );
  if (!pharmacyData) {
    return res.status(401).json({ message: "Pharmacy not found" });
  }

  res.status(200).json({
    pharmacyData: pharmacyData ?? [],
  });
});

module.exports = router;
