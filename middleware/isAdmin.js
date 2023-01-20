const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["token"];

  if (!token) {
    return res.status(403).json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    if(req.user.role !== "admin"){
        return res.status(401).json({ message: "Não autorizado, contate o administrador." });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;