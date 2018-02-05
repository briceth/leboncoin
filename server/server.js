import express from "express";
import router from "./router";
import middleware from "./middleware";

const app = express();

middleware(app);

app.use(router);

app.listen(3008, err => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on 3000`);
});

exports = app;
