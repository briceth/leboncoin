import express from 'express'
import router from './router'
import middleware from './middleware'
import mongoose from 'mongoose'
import auth from './auth'
//connect either mongodb prod or mongodb dev
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/students-app')

const app = express()
//to write .ejs in render method
app.set('view engine', 'ejs')
//middleware function prend en argument app
middleware(app)
//app use router and auth object router
app.use(router)
app.use(auth)

//must use PORT for Heroku
app.listen(process.env.PORT || 3008, err => {
	if (err) return console.log(err)
	return console.log(`server is listening on ${process.env.PORT || 3008}`)
})

exports = app
