import express from 'express'
import multer from 'multer'
import uuidv1 from 'uuid/v1'
import Annonce from './annonce'
import chalk from 'chalk'

const log = console.log
const router = express.Router()
const upload = multer({ dest: 'public/uploads/' })

router.get('/annonces/:page', (req, res, next) => {
	const page = req.params.page || 1

	Annonce.find({})
		.skip(5 * page)
		.limit(5)
		.exec((err, annonces) => {
			Annonce.count().exec((err, count) => {
				if (err) return next(err)
				res.render('annonces', {
					annonces,
					current: page,
					pages: Math.ceil(count / 5) //lourd
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

router.post('/annonce-update/:id', upload.single('file'), (req, res, next) => {
	const { id } = req.params
	const { filename } = req.file
	//console.log("body file =>", req.file);

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

router.post('/deposer', upload.single('file'), (req, res, next) => {
	console.log('file', req.file)
	const { filename } = req.file
	const {
		title,
		description,
		price,
		city,
		pseudo,
		email,
		phone,
		type
	} = req.body

	console.log('body', req.body)
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
	})

	annonce.save((error, object) => {
		if (error) {
			log(chalk.red(error))
		} else {
			log(chalk.green('success'), object)
			res.redirect('/')
		}
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
