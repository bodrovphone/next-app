const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const namespace = "http://localhost:3000/";

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksUri: "https://dev-4vh4q7if.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: "Yp4oRNsPjRxBSVyZRzTm8B6sefH382Zx",
  issuer: "https://dev-4vh4q7if.eu.auth0.com/",
  algorithms: ["RS256"]
});

exports.checkRole = role => ({ user }, res, next) => {
  if (user && user[namespace + "role"] === role) {
    next();
  } else {
    return res.status(401).send({
      title: "notAuthorizes",
      desription:
        "Not Authorized to see this data. Hello from server auth middleware namely checkRole"
    });
  }
};
