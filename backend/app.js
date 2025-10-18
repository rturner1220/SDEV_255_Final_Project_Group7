const express = require("express");
const cors = require("cors");

require("./db");
const Course = require("./models/course");
const Enrollment = require("./models/enrollment");
const User = require("./models/user");

const app = express();

const allowed = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: allowed }));
app.use(express.json());

const authRouter = require("./auth");
app.use("/api/auth", authRouter);

const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET || "supersecret";

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || ""; // "Bearer <token>"
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    req.user = jwt.decode(token, secret); // { id, role, username }
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

const router = express.Router();

// List users (optionally filter by role). Protected so only teachers can see it.
router.get(
  "/users",
  requireAuth,
  requireRole("teacher"),
  async (req, res) => {
    try {
      const { role } = req.query;          // e.g. /api/users?role=teacher
      const filter = role ? { role } : {};
      const users = await User.find(filter)
        .select("username email role createdAt") // never send password fields
        .lean()
        .exec();
      res.json(users);
    } catch (e) {
      console.error("GET /users error:", e);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
);

// Count by role (or total if no role is provided)
router.get("/users/count", async (req, res) => {
  try {
    const { role } = req.query;            // e.g. ?role=teacher or ?role=user
    const filter = role ? { role } : {};
    const count = await User.countDocuments(filter);
    res.json({ role: role || "all", count });
  } catch (e) {
    res.status(500).json({ error: "Failed to count users" });
  }
});

// Grouped counts for all roles + total (covers teacher/user/admin, etc.)
router.get("/users/counts", async (req, res) => {
  try {
    const rows = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);
    const out = { total: 0 };
    for (const r of rows) {
      out[r._id] = r.count;     // e.g. out.teacher, out.user, out.admin
      out.total += r.count;
    }
    res.json(out);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch user counts" });
  }
});

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
router.post(
  "/courses",
  requireAuth,
  requireRole("teacher"),
  async (req, res) => {
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(201).json(course);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// Update is to update and existing record/resource/database entry...
router.put(
  "/courses/:id",
  requireAuth,
  requireRole("teacher"),
  async (req, res) => {
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
  }
);

// Delete a course
router.delete(
  "/courses/:id",
  requireAuth,
  requireRole("teacher"),
  async (req, res) => {
    try {
      await Course.deleteOne({ _id: req.params.id });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post(
  "/enroll/:courseId",
  requireAuth,
  requireRole("user"),
  async (req, res) => {
    try {
      const row = await Enrollment.create({
        student: req.user.id,
        course: req.params.courseId,
      });
      res.status(201).json(row);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

router.delete(
  "/enroll/:courseId",
  requireAuth,
  requireRole("user"),
  async (req, res) => {
    await Enrollment.deleteOne({
      student: req.user.id,
      course: req.params.courseId,
    });
    res.sendStatus(204);
  }
);

router.get("/schedule", requireAuth, requireRole("user"), async (req, res) => {
  const rows = await Enrollment.find({ student: req.user.id })
    .populate("course")
    .exec();
  res.json(rows.map((r) => r.course));
});

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));
