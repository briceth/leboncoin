import bodyParser from "body-parser";
import morgan from "morgan";
import app from "./server";

module.exports = app => {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
