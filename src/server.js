const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth"); // Import auth routes
const jobRoutes = require("./routes/jobRoutes"); // Import job routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API!");
});


// Use the routes
app.use("/api/auth", authRoutes);  // For registration and login
app.use("/api/jobs", jobRoutes);   // For job-related actions

// MongoDB connection and server start
mongoose.connect("mongodb://localhost:27017/job-portal")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
