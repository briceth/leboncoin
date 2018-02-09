//import mongoose from "mongoose";
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Annonce = new Schema({
	title: { type: String, required: [true, 'Le titre ne peut pas être vide'] },
	description: {
		type: String,
		required: [true, 'La description ne peut pas être vide']
	},
	price: {
		type: Number,
		validate: {
			validator: function(v) {
				return /^[0-9]*$/.test(v) //return non negative number
			},
			message: '{VALUE} ne peut pas être négatif!'
		},
		required: true
	},
	city: { type: String, required: [true, 'La ville ne peut pas être vide'] },
	pseudo: { type: String, required: [true, 'Le pseudo ne peut pas être vide'] },
	email: {
		type: String,
		validate: {
			validator: function(value) {
				return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
					value
				)
			},
			message: 'Ceci un email invalide!'
		},
		required: true
	},
	phone: {
		type: String,
		validate: {
			validator: function(value) {
				return /^\d+$/.test(value) //only numbers
			},
			message: 'Ceci est un numéro invalide!'
		},
		required: true
	},
	img: [String], //le mec a plusieurs images
	type: { type: String, required: [true, 'Le type ne peut pas être vide'] }, //soit Offres soit Demandes
	//author: { type: Schema.Types.ObjectId, ref: "User" },
	date: { type: Date, default: Date.now },
	address: {
		address: String,
		lat: String,
		lng: String
	}
})

Annonce.path('title').validate(value => {
	return value.length <= 30
}, 'La taille maximum est de 25 caractères.')

Annonce.path('phone').validate(value => {
	return value.length === 10
}, 'Pas assez de numéro')

module.exports = mongoose.model('annonces', Annonce)
