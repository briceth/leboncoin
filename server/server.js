import express from "express";
import router from "./router";
import middleware from "./middleware";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost/students-app");

middleware(app);

app.use(router);

app.listen(3008, err => {
  if (err) {
    return console.log(err);
  }
  return console.log(`server is listening on 3008`);
});

exports = app;
