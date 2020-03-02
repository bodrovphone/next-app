const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// SERVICES

const authService = require("./services/auth");

const config = require("./config");

const bookRoutes = require("./routes/book");
const portfolioRoutes = require("./routes/portfolio");
const BlogRoutes = require("./routes/blog");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const secretData = [
  { title: "SecretData 1", description: "Plans how to build spaceship" },
  { title: "SecretData 2", description: "My secret data" }
];

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(data => {
    console.log("Connected to mongo");
  })
  .catch(e => console.log(e));

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.use("/api/v1/book", bookRoutes);
    // server.use("/api/v1/portfolio", portfolioRoutes);
    server.use("/api/v1/portfolios", portfolioRoutes);
    server.use("/api/v1/blogs", BlogRoutes);

    server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
      return res.json(secretData);
    });

    server.get(
      "/api/v1/onlysiteowner",
      authService.checkJWT,
      authService.checkRole("siteOwner"),
      (req, res) => {
        console.log(req.user);
        return res.json(secretData);
      }
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use(function(err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res
          .status(401)
          .send({ title: "invalid token...", detail: "unathorized access..." });
      }
    });

    server.use(handle).listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
