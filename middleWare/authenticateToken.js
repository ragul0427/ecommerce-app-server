const jwt = require("jsonwebtoken");

// Middleware to validate the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token, "token");
  if (!token) {
    return res.status(401).send("unAuthorized");
  }

  try {
    const decoded = jwt.verify(token, "abcd123");
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = authenticateToken;
