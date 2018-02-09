import express from 'express'
import multer from 'multer'
import uuidv1 from 'uuid/v1'
import Annonce from './annonce'
import chalk from 'chalk'
import getLatAndLong from './google-service'
const log = console.log
const router = express.Router()
const upload = multer({ dest: 'public/uploads/' })

router.get('/annonces/:page', (req, res, next) => {
	const page = req.params.page || 0
	const limit = 5

	Annonce.find({})
		// .skip(limit * page - limit)
		// .limit(limit)
		.exec((err, annonces) => {
			Annonce.count().exec((err, count) => {
				if (err) return next(err)
				res.render('annonces', {
					annonces,
					current: page,
					pages: Math.ceil(count / limit) //lourd
				})
			})
		})
})

router.get('/deposer', (req, res, next) => {
	res.render('deposer', {
		url: 'deposer',
		annonce: {}
	})
})

router.get('/annonce/:id', (req, res, next) => {
	const { id } = req.params

	Annonce.findOne({ _id: id }, (error, annonce) => {
		res.render('annonce', {
			annonce
		})
	})
})

router.get('/annonce/:id/update', (req, res, next) => {
	const { id } = req.params

	Annonce.findOne({ _id: id }, (error, annonce) => {
		res.render('deposer', {
			url: '/annonce-update/' + annonce._id,
			annonce: annonce || ''
		})
	})
})

router.post('/annonce-update/:id', upload.array('photos'), (req, res, next) => {
	const { id } = req.params
	const { filename } = req.files
	console.log('body =>', req.body)

	const { annonce } = req.body
	Annonce.findByIdAndUpdate(
		{ _id: id },
		{ annonce },
		{ new: true },
		(error, doc) => {
			if (error) {
				console.error('error', error)
			} else {
				console.log('doc update =>', doc)
				res.redirect('/')
			}
		}
	)
})

router.post('/deposer', upload.array('photos', 3), (req, res, next) => {
	//console.log('files', req.files)
	let filesName = []
	for (let i = 0; i < req.files.length; i++) {
		const file = req.files[i]
		filesName.push(file.filename)
	}

	const {
		title,
		description,
		price,
		city,
		pseudo,
		email,
		phone,
		type,
		address
	} = req.body

	console.log('body', req.body)
	getLatAndLong(address, (lat, lng) => {
		console.log('from router', lat, lng)

		const annonce = new Annonce({
			title,
			description,
			price: parseInt(price),
			city,
			pseudo,
			email,
			phone,
			type: type, // faut que ce soit un tableau à la création!
			img: filesName,
			address: {
				address,
				lat,
				lng
			}
		})
		//console.log(annonce)

		annonce.save((error, object) => {
			if (error) {
				log(chalk.red(error))
			} else {
				log(chalk.green('success'), object)
				res.redirect('/annonces/1')
			}
		})
	})
})

router.get('/delete/:id', (req, res, next) => {
	const { id } = req.params

	const { annonce } = req.body
	Annonce.findByIdAndRemove({ _id: id }, (error, doc) => {
		if (error) {
			console.error('error', error)
		} else {
			console.log('doc removed =>', doc)
			res.redirect('/')
		}
	})
})

router.get('/offres', (req, res, next) => {
	Annonce.find({ type: 'offre' }, (error, docs) => {
		if (error) {
			console.error('error', error)
		} else {
			//console.log("docs with type Offre =>", docs);
			res.render('offres', {
				annonces: docs
			})
		}
	})
})

router.get('/demandes', (req, res, next) => {
	Annonce.find({ type: 'demande' }, (error, docs) => {
		if (error) {
			console.error('error', error)
		} else {
			//console.log("docs with type Demande =>", docs);
			res.render('offres', {
				annonces: docs
			})
		}
	})
})

module.exports = router
