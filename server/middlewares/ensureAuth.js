const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    return res.redirect("/auth/signup");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.Id;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
