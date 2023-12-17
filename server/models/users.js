const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  userRole: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
  },
  bornDate: {
    type: Number,
  },
  comments: {
    type: Object,
  },
  ratedPharmacies: {
    type: Object,
  },
});
//works just before the data added to the db
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    //new or updated password
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
