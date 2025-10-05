const express = require("express");
const cors = require("cors");

require("./db");
const Course = require("./models/course");

const app = express();

const allowed = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: allowed }));

app.use(express.json());

const router = express.Router();

// Get all the courses
router.get("/courses", async function (req, res) {
  try {
    const { subject } = req.query || {};
    const query = subject ? { subject } : {};
    
    const courses = await Course.find(query).exec();
    res.json(courses);
  } catch (err) {
    console.error("GET /courses error:", err);
    res.status(400).json({ message: err.message });
  }
});

// routes (same router where you have /api/courses)
router.get("/courses/count", async (req, res) => {
  const count = await Course.countDocuments({});
  res.json({ count });
});

// Get course by id
router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add course to the database
router.post("/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update is to update and existing record/resource/database entry...
router.put("/courses/:id", async (req, res) => {
  try {
    const course = req.body;
    delete course._id;
    await Course.updateOne({ _id: req.params.id }, course);
    console.log(course);
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});



// Delete a course
router.delete("/courses/:id", async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});



app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));
