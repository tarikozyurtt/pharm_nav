const jwt = require("jsonwebtoken");
const User = require("../models/users");
const connectDB = require("../helpers/dbMongoose");

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  //   console.log(req);

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    // console.log(decoded);
    // Add the decoded user information to the request object
    const user = await User.findById(decoded.user._id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    req.user = user;

    // Call the next middleware function
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
