const express = require("express");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");

const User = require("./models/user");
const secret = process.env.JWT_SECRET || "supersecret";

const r = express.Router();

// POST /api/auth/register
r.post("/register", async (req, res) => {
  const username = (req.body.username || "").trim();
  const password = req.body.password || "";
  const role = (req.body.role || "").trim(); // "teacher" | "user"
  if (!username || !password || !role)
    return res.status(400).json({ error: "Missing fields" });

  const exists = await User.findOne({ username });
  if (exists) return res.status(409).json({ error: "Username already taken" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash: hash, role });
  // return token so client can auto-login
  const token = jwt.encode(
    { id: user._id, role: user.role, username: user.username },
    secret
  );
  res
    .status(201)
    .json({ id: user._id, username: user.username, role: user.role, token });
});

// POST /api/auth/login
r.post("/login", async (req, res) => {
  const username = (req.body.username || "").trim();
  const password = req.body.password || "";
  if (!username || !password)
    return res.status(400).json({ error: "Missing username or password" });

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "Bad username or password" });

  // Guard against legacy/invalid records that do not have a passwordHash field
  if (!user.passwordHash) {
    return res
      .status(401)
      .json({
        error: "Account has no password set. Please reset or re-register.",
      });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Bad username or password" });

  const token = jwt.encode(
    { id: user._id, role: user.role, username: user.username },
    secret
  );
  res.json({ token, role: user.role, username: user.username });
});

module.exports = r;
