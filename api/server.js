const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/restricted-middleware.js");
const authRouter = require("../auth/auth-router.js");
const chefsRouter = require("../chefs/chefs-router.js");
const publicRouter = require("../public/public-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use("/auth", authRouter);
server.use("/chefs", authenticate, chefsRouter);
server.use("/home", publicRouter);
server.get("/", (req, res) => {
  res.send("Welcome to Chef Portfolio Backend API");
});

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

module.exports = server;
