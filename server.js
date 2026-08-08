const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Root welcome endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Manager Backend API" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Error middleware
app.use(require("./middleware/errorHandler"));

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  connectDB()
    .then(() => {
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = { app, connectDB };
