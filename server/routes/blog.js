const express = require("express");
const router = express.Router();
const controllers = require("../controllers/blog");
const authService = require("../services/auth");

router.post(
  "/",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  controllers.createBlog
);

// router.get("", controllers.getBlogs);

// router.patch(
//   "/blog/:id",
//   authService.checkJWT,
//   authService.checkRole("siteOwner"),
//   controllers.updateBlog
// );

// router.get("/blog/:id", controllers.getBlogById);

// router.delete(
//   "/blog/:id",
//   authService.checkJWT,
//   authService.checkRole("siteOwner"),
//   controllers.deleteBlog
// );

module.exports = router;
