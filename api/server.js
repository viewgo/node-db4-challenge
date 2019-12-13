const express = require("express");
const helmet = require("helmet");

const recipesRouter = require("../recipes/recipes-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api", recipesRouter);

module.exports = server;
