const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI, { dbName: "CourseDB" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });

module.exports = mongoose;
