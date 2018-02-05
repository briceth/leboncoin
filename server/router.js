import express from "express";
const app = express();
const router = express.Router();
import multer from "multer";

const upload = multer({ dest: "uploads/" });

router.get("/", (req, res, next) => {
  res.render("main.ejs");
});

router.get("/deposer", (req, res, next) => {
  res.render("deposer.ejs");
});

router.post("/add/deposer", upload.single("file"), (req, res, next) => {
  //res.render("deposer.ejs");
  //const {}
  console.log("body", req.body);
  console.log("file", req.file);

  //res.redirect("/");
});

module.exports = router;
