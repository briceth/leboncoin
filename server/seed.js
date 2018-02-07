const Annonce = require("./annonce");
const chalk = require("chalk");
const faker = require("faker");
const mongoose = require("mongoose");
const log = console.log;

mongoose.connect("mongodb://localhost/students-app");

function deleteAnnonces() {
  return new Promise((resolve, reject) => {
    Annonce.remove({}, error => {
      if (error) {
        reject(error);
      } else {
        log(chalk.green("deleting the database"));
        resolve("collection removed");
      }
    });
  });
}

function seedAnnonces() {
  for (let i = 0; i < 5; i++) {
    const annonce = new Annonce({
      title: "Lorem Ipsum is simply dummy",
      description: faker.lorem.words(),
      price: faker.commerce.price(),
      city: faker.address.city(),
      pseudo: faker.internet.userName(),
      email: faker.internet.email(),
      phone: "0789653465",
      type: "offre",
      img: [faker.image.image()]
    });
    //console.log("annonce", annonce);

    annonce.save((error, object) => {
      if (error) {
        log(chalk.red(error));
      } else {
        log(chalk.green("success"), object);
      }
    });
  }
}

deleteAnnonces()
  .then(() => seedAnnonces())
  .catch(error => log(chalk.red(error)));
//seedAnnonces();
//getAllAnnonces();
// deleteDB()
//   .then(() => seedAnnonces())
//   .catch(error => log(chalk.red(error)));
