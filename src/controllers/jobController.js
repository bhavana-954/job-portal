// controllers/jobController.js
const Job = require("../models/Job");

exports.addJob = async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      user: req.user.id,
    });

    await newJob.save();
    res.status(201).json({
      message: "Job addedd Successsfully",
      job: newJob,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      message:"Jobs fetched successfully",
      jobs: jobs,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateJob = async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { title, description, location },
      { new: true }
    );
    
    if (!updatedJob) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.json(updatedJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await job.remove();
    res.json({ msg: "Job removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
