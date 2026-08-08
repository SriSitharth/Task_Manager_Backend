const { app, connectDB } = require("../server");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return res.status(500).json({ message: "Unable to connect to database" });
  }

  return app(req, res);
};
