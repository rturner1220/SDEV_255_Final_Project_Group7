// Add course to student schedule
router.post("/enroll/:courseId", requireAuth, requireRole("user"), async (req, res) => {
  try {
    const row = await Enrollment.create({ student: req.user.id, course: req.params.courseId });
    res.status(201).json(row);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Remove course from schedule
router.delete("/enroll/:courseId", requireAuth, requireRole("user"), async (req, res) => {
  await Enrollment.deleteOne({ student: req.user.id, course: req.params.courseId });
  res.sendStatus(204);
});

// Get current student's schedule
router.get("/schedule", requireAuth, requireRole("user"), async (req, res) => {
  const rows = await Enrollment.find({ student: req.user.id }).populate("course").exec();
  res.json(rows.map(r => r.course));
});
