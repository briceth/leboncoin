const express = require("express");
//import * as express from "express";
const app = express();
const route = require('router');

app.use(route)
app.listen(3008, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on 3000`)
})

//import * as express from 'express'

// class App {
//   public express

//   constructor () {
//     this.express = express()
//     this.mountRoutes()
//   }

//   private mountRoutes (): void {
//     const router = express.Router()
//     router.get('/', (req, res) => {
//       res.json({
//         message: 'Hello World!'
//       })
//     })
//     this.express.use('/', router)
//   }
// }

// export default new App().express