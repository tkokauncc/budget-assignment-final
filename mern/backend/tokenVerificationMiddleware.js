const jwt = require("jsonwebtoken");

function tokenVerificationMiddleware(req, res, next) {
  const secretToken = "SecretToken12345";
  const token = req.headers.authorization;

  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretToken);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = tokenVerificationMiddleware;
