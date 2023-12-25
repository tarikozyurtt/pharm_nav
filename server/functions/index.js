const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const serverless = require("serverless-http");
const userRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const pharmacyRouter = require("../routes/pharmacy");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/.netlify/functions/index", userRouter);
app.use("/.netlify/functions/index", authRouter);
app.use("/.netlify/functions/index", pharmacyRouter);
// app.get('/.netlify/functions/index/apiV2', async (req, res) => {
//     //await connectDB();
//     await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     console.log(process.env.MONGODB_URI);

//     const newUser = {
//         name: "testEgemen1234",
//         email: "testegemen1234@hotmail.com",
//         password: "testegemenpass",
//     };
//     //const m = new User(newUser);

//     //await m.save(); // works

//     res.send("hello");
// })
// {
//     "name": "Egemen",
//     "email": "xyzt74@hotmail.com",
//     "password": "$2b$10$iMXp8PuzODYBjN7hcblhsOEOp1QVyVsIrQ0nnQB/BN/a35dSRXyJC",
//     "messages": [],
//     "_id": "655a013b7d3fea15b986f490",
//     "__v": 0
// }

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
module.exports.handler = serverless(app);
