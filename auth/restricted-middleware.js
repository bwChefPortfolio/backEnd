const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const secret = process.env.JWT_SECRET;

  if (authorization) {
    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token. Please login." });
      } else {
        req.token = decodedToken;
        res.username = decodedToken.username;
        console.log("middleware username", req.username);
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again" });
  }
};
