const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send('Token is not included in Authorization header!');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).send('Invalid JWT token. Please login to obtain valid JWT token.');
  }
  return next();
}

module.exports = verifyToken;
