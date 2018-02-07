import express from "express";
import multer from "multer";
import uuidv1 from "uuid/v1";
import Annonce from "./annonce";
import chalk from "chalk";

const log = console.log;
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", (req, res, next) => {
  Annonce.find({}, (error, annonces) => {
    if (error) {
      console.log(error);
    } else {
      res.render("offres.ejs", {
        annonces
      });
    }
  });
});

router.get("/deposer", (req, res, next) => {
  res.render("deposer.ejs", {
    url: "deposer"
  });
});

router.get("/annonce/:id", (req, res, next) => {
  const { id } = req.params;

  Annonce.findOne({ _id: id }, (error, annonce) => {
    res.render("annonce.ejs", {
      annonce
    });
  });
});

router.get("/annonce/:id/update", (req, res, next) => {
  const { id } = req.params;

  Annonce.findOne({ _id: id }, (error, annonce) => {
    res.render("deposer.ejs", {
      url: "/annonce-update/" + annonce._id,
      annonce: annonce || ""
    });
  });
});

router.post("/annonce-update/:id", upload.single("file"), (req, res, next) => {
  const { id } = req.params;
  const { filename } = req.file;
  console.log("body file =>", req.file);
  console.log("body update =>", req.body);
  const { annonce } = req.body;
  Annonce.findByIdAndUpdate({ _id: id }, { annonce }, { new: true });
});

router.post("/deposer", upload.single("file"), (req, res, next) => {
  console.log("file", req.file);
  const { filename } = req.file;
  const {
    title,
    description,
    price,
    city,
    pseudo,
    email,
    phone,
    type
  } = req.body;

  console.log("body", req.body);
  const annonce = new Annonce({
    title,
    description,
    price: parseInt(price),
    city,
    pseudo,
    email,
    phone,
    type: type, // faut que ce soit un tableau à la création!
    img: [filename]
  });

  annonce.save((error, object) => {
    if (error) {
      log(chalk.red(error));
    } else {
      log(chalk.green("success"), object);
      res.redirect("/");
    }
  });
});

module.exports = router;
