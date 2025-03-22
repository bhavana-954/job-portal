const jwt = require("jsonwebtoken");

router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ msg: "Refresh Token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, "your_refresh_token_secret_key");

    const newAccessToken = jwt.sign(
      { user: decoded.user }, // User info
      "your_jwt_secret_key",  // Your access token secret key
      { expiresIn: "1h" } // Set your desired expiration time
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: "Invalid Refresh Token" });
  }
});
