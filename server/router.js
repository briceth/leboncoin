import express from "express";
const app = express();
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "ok" });
});

module.exports = router;
