const Annonce = require('./annonce')
const chalk = require('chalk')
const faker = require('faker')
const mongoose = require('mongoose')
const log = console.log

mongoose.connect('mongodb://localhost/students-app')

function deleteAnnonces() {
	return new Promise((resolve, reject) => {
		Annonce.remove({}, error => {
			if (error) {
				reject(error)
			} else {
				log(chalk.green('deleting the database'))
				resolve('collection removed')
			}
		})
	})
}

function seedAnnonces() {
	console.log(
		faker.address.streetAddress(),
		faker.address.city(),
		faker.address.country()
	)

	for (let i = 0; i < 6; i++) {
		const annonce = new Annonce({
			title: 'Lorem Ipsum is simply dummy',
			description: faker.lorem.words(),
			price: faker.commerce.price(),
			city: faker.address.city(),
			pseudo: faker.internet.userName(),
			email: faker.internet.email(),
			// address:
			// 	faker.address.streetAddress() +
			// 	', ' +
			// 	faker.address.city() +
			// 	', ' +
			// 	faker.address.county(),
			phone: '0789653465',
			type: 'offre',
			img: [faker.image.image(), faker.image.image(), faker.image.image()]
		})
		//console.log("annonce", annonce);

		annonce.save((error, object) => {
			if (error) {
				log(chalk.red(error))
			} else {
				log(chalk.green('success'), object)
			}
		})
	}
	for (let i = 0; i < 6; i++) {
		const annonce = new Annonce({
			title: 'Lorem Ipsum is simply dummy',
			description: faker.lorem.words(),
			price: faker.commerce.price(),
			city: faker.address.city(),
			pseudo: faker.internet.userName(),
			email: faker.internet.email(),
			phone: '0145878909',
			type: 'demande',
			// address:
			// 	faker.address.streetAddress() +
			// 	', ' +
			// 	faker.address.city() +
			// 	', ' +
			// 	faker.address.county(),
			img: [faker.image.image(), faker.image.image(), faker.image.image()]
		})
		//console.log("annonce", annonce);

		annonce.save((error, object) => {
			if (error) {
				log(chalk.red(error))
			} else {
				log(chalk.green('success'), object)
			}
		})
	}
}

deleteAnnonces()
// .then(() => seedAnnonces())
// .catch(error => log(chalk.red(error)))
