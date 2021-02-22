// Importing modules
const jwt = require("jsonwebtoken");
const config = require("config");

// Creating an route validation middleware
module.exports = (req, res, next) => {
  // Check wether user have the token in there request header
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Access Denied" });

  try {
    // Send the user's id through header response after decoding token
    const payload = jwt.verify(token, config.get("secretKey"));
    req.user = payload._id;
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Invalid Token" });
  }

  // Call the next middleware
  next();
};
