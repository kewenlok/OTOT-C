const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
  } catch (error) {
    return res.status(401).send('Token is not included in Authorization header!');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).send('Invalid JWT token. Please login to obtain valid JWT token.');
  }
  return next();
}

module.exports = verifyToken;
