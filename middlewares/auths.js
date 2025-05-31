const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_STATUS_CODE } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("You are not authorized to access this resource");
    error.statusCode = UNAUTHORIZED_STATUS_CODE;
    throw error;
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    const error = new Error("Wrong token");
    error.statusCode = UNAUTHORIZED_STATUS_CODE;
    throw error;
  }
};

module.exports = auth;
