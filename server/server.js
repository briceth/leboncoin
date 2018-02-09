import express from 'express'
import router from './router'
import middleware from './middleware'
import mongoose from 'mongoose'
import auth from './auth'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/students-app')

const app = express()
//to write .ejs in render method
app.set('view engine', 'ejs')

middleware(app)

app.use(router)
app.use(auth)

app.listen(process.env.PORT || 3008, err => {
	if (err) {
		return console.log(err)
	}
	return console.log(`server is listening on 3008`)
})

exports = app
