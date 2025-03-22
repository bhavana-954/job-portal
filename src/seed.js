const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/Job"); // Ensure Job model is correct

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedJobs = async () => {
  try {
    const jobs = [
      { title: "Software Engineer", company: "Google", location: "Remote" },
      { title: "Backend Developer", company: "Amazon", location: "Hyderabad" }
    ];
    await Job.insertMany(jobs);
    console.log("✅ Jobs inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting jobs:", error);
    mongoose.connection.close();
  }
};

// Run the function
seedJobs();
