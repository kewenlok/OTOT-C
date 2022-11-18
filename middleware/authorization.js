
const authorizeUser = (acceptedRoles) => {
  return (req, res, next) =>{ 
    if (!acceptedRoles.includes(req.user.role)) {
      return res.status(403).send("You do not have permission to view this page!");
    }
    next();
  }
}

module.exports = authorizeUser;