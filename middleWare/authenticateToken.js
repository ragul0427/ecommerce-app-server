const jwt = require("jsonwebtoken");
const {get}=require("lodash")

const authenticateUser = async (req, res, next) => {
  const token = get(req,"cookies.token",false);
  console.log(token,"auth");
  try {
    if (!token) {
      res.status(401).send("no token provided");
    } else {
      jwt.verify(token, "abcd123", (err, decoded) => {
        if (err) {
          res.status(401).send("unauthorized:invalid token");
        } else {
          req.userId = decoded;
          next();
        }
      });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = authenticateUser;
