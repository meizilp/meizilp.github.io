import * as express from "express"

import birds from "./birds"

let app = express()

app.get('/', function root_get(req, res) {
  res.send('Hello Express!')
})

app.get('/foo', function foo_get(req, res) {
  res.send('Hello Express!')
})

app.use('/boo', function boo_use(req, res, next) {
  console.log("boo1")
  next()
})

// app.use('/boo', function boo_use(req, res, next) {
//   console.log("boo2")
//   next('route')
//   console.log("boo2-2")
// }, function boo_use2(req, res, next) {
//   console.log("boo2i2")
// })

app.use('/boo', function boo_use(req, res, next) {
  console.log("boo2")
  next('route')
  console.log("boo2-2")
})

app.use('/boo', function boo_use(req, res, next) {
  console.log("boo3")
  next()
})

app.all('/too', (req, res, next) => {
  next()
})

app.get("/icon", (req, res) => {
  res.json(req.params)
})

app.use('/birds', birds)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something wrong')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
