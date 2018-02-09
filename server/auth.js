import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from './user'
import sha1 from 'sha1'
const router = express.Router()

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser()) // JSON.stringify
passport.deserializeUser(User.deserializeUser()) // JSON.parse

router.get('/register', (req, res) => {
	res.render('register.ejs')
})

router.post('/register', (req, res) => {
	User.register(
		new User({
			username: req.body.username,
			password: sha1(req.body.password + 'lereacteur')
			// D'autres champs peuvent être ajoutés ici
		}),
		req.body.password, // password will be hashed
		(err, user) => {
			if (err) {
				console.log(err)
				return res.render('register')
			} else {
				passport.authenticate('local')(req, res, () => {
					res.redirect('/annonces/1')
				})
			}
		}
	)
})

router.get('/login', (req, res) => {
	res.render('login', { user: req.user })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.redirect('/annonces/1')
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/annonces/1')
})

module.exports = router
