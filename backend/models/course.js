const db = require("../db");

const Course = db.model("Course", {
  name:        { type: String, required: true }, // course title
  subject:     { type: String, required: true }, // e.g., "CS"
  credits:     { type: Number, required: true, min: 1, max: 4 },
  description: { type: String, default: "" }
});

module.exports = Course;
