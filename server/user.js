import mongoose from 'mongoose'
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
	username: {
		type: String,
		required: [true, 'Le username ne peut pas être vide']
	},
	password: {
		type: String,
		required: [true, 'Le password ne peut pas être vide']
	},
	type: [{ type: String, required: [true, 'Choisissez un type'] }], //soit particulier soit professionnel
	annonces: [{ type: Schema.Types.ObjectId, ref: 'annonces' }],
	date: { type: Date, default: Date.now }
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
