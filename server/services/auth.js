const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksUri: "https://dev-4vh4q7if.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: "Yp4oRNsPjRxBSVyZRzTm8B6sefH382Zx",
  issuer: "https://dev-4vh4q7if.eu.auth0.com/",
  algorithms: ["RS256"]
});
