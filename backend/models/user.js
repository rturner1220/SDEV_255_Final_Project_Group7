// backend/models/user.js
const db = require("../db");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["teacher", "user"], required: true },
  },
  { timestamps: true }
);

module.exports = db.model("User", UserSchema);
