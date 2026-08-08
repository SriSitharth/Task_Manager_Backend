const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const router = express.Router();

// Get all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});

// Create task
router.post(
  "/",
  auth,
  body("title").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const task = await Task.create({ ...req.body, userId: req.user.userId });
    res.status(201).json(task);
  }
);

// Update task
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!result) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
