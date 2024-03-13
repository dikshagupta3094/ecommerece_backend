const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: 10,
    },
    userType: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model('user',userSchema)
