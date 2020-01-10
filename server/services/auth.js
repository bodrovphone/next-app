exports.checkJWT = function(req, res, next) {
  const isValid = false;
  if (isValid) {
    next();
  } else {
    return res
      .status(401)
      .send({ title: "Not Auhtorized", details: "fuck off" });
  }
};
