const routes = require("next-routes");

module.exports = routes().add("portfolio", "portfolios/portfolio/:id");
