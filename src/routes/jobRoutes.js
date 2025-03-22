// routes/jobRoutes.js
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const jobController = require("../controllers/jobController");

const router = express.Router();

// Add a Job (Protected route)
router.post("/add-job", verifyToken, jobController.addJob);

// Get All Jobs (Protected route)
router.get("/jobs", verifyToken, jobController.getJobs);


// Update a Job (Protected route)
router.put("/update-job/:id", verifyToken, jobController.updateJob);


// Delete a Job (Protected route)
router.delete("/delete-job/:id", verifyToken, jobController.deleteJob);

module.exports = router;
