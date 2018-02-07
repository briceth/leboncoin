import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import app from "./server";
import chalk from "chalk";
const log = console.log;

module.exports = app => {
  app.use(express.static("uploads"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  morgan(function(tokens, req, res) {
    return [
      log(
        chalk.green(
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          "-",
          tokens["response-time"](req, res),
          "ms"
        )
      )
    ].join(" ");
  });
};
