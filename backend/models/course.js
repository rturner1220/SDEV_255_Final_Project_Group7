// backend/models/course.js
const db = require("../db");
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", required: true },
    subject: { type: String, required: true },
    number: { type: String, required: true, trim: true },
    credits: { type: Number, required: true, min: 1, max: 4 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = db.model("Course", CourseSchema);
