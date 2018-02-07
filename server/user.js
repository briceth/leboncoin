import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  pseudo: { type: String, required: [true, "Le titre ne peut pas être vide"] },
  type: [{ type: String, required: [true, "Choisissez un type"] }], //soit particulier soit professionnel
  annonces: [{ type: Schema.Types.ObjectId, ref: "annonces" }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", User);
