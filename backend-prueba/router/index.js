const express = require("express");
const superHeroes = require("./SuperHeroes");

const RouterMain = express.Router();

RouterMain.use("/api/superheroes", superHeroes);

module.exports = RouterMain;
