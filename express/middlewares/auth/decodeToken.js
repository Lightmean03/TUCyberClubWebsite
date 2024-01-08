const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const decodeToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.email;
    console.log("decoded", decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = decodeToken;
