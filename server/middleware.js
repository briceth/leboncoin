import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import app from './server'
import chalk from 'chalk'
import passport from 'passport'
import mongoose from 'mongoose'
import expressSession from 'express-session'
//import mongoStore from 'connect-mongo'
var mongoStore = require('connect-mongo')(expressSession)
const log = console.log

module.exports = app => {
	//app.use(express.session({ secret: 'lereacteur' }))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(express.static('public'))
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	// Activer la gestion de la session
	app.use(
		expressSession({
			secret: 'thereactor09',
			resave: false,
			saveUninitialized: false,
			store: new mongoStore({ mongooseConnection: mongoose.connection })
		})
	)

	morgan((tokens, req, res) => {
		return [
			log(
				chalk.green(
					tokens.method(req, res),
					tokens.url(req, res),
					tokens.status(req, res),
					tokens.res(req, res, 'content-length'),
					'-',
					tokens['response-time'](req, res),
					'ms'
				)
			)
		].join(' ')
	})
}
