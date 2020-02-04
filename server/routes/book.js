const express = require("express");
const router = express.Router();
const controllers = require("../controllers/book");

router.post("", controllers.saveBook);

router.get("", controllers.getBooks);

router.patch("/:id", controllers.updateBook);

router.delete("/:id", controllers.deleteBook);

module.exports = router;
