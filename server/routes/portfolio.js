const express = require("express");
const router = express.Router();
const controllers = require("../controllers/portfolio");
const authService = require("../services/auth");

router.post(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  controllers.savePortfolio
);

router.get(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  controllers.getPortfolios
);

module.exports = router;
