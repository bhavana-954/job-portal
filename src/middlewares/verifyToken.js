const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization") && req.header("Authorization").split(" ")[1]; // Get the token from Authorization header

  if (!token) {
    return res.status(403).json({ msg: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, "your_actual_secret_key"); // Replace with your secret key
    req.user = decoded.user; // Attach user data to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ msg: "Invalid Token" });
  }
};

module.exports = verifyToken;
