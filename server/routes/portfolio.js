const express = require("express");
const router = express.Router();
const controllers = require("../controllers/portfolio");
const authService = require("../services/auth");

router.post(
  "/portfolio",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  controllers.savePortfolio
);

router.get("", controllers.getPortfolios);

router.patch(
  "/portfolio/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  controllers.updatePortfolio
);

router.get("/portfolio/:id", controllers.getPortfolioById);

router.delete(
  "/portfolio/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  controllers.deletePortfolio
);

module.exports = router;
