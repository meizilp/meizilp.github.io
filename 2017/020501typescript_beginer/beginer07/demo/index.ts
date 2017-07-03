import * as express from "express"

import birds from "./birds"

let app = express()

app.get('/', function root_get(req, res) {
  res.send('Hello Express!')
})

app.route('/book')
.get((req, res) => {})
.post((req, res) => {})
.put((req, res) => {})

app.get('/foo', function foo_get1(req, res, next) {
  console.log('foo_get1 before')
  next('route')
  console.log('foo_get1 after')
}, function foo_get11(req, res, next) {
  console.log('foo_get11 before')
  next()
  console.log('foo_get11 after')
})

app.get('/foo', function foo_get2(req, res, next) {
  console.log('foo_get2 before')
  next()
  console.log('foo_get2 after')
})

app.get('/foo', function foo_get3(req, res) {
  res.send('Hello Express foo!')
})

app.use('/boo', function boo_use(req, res, next) {
  console.log("boo1")
  next()
})

app.use('/boo', function boo_use(req, res, next) {
  console.log("boo2")
  next('route')
  console.log("after boo2")
}, function boo_use2(req, res, next) {
  console.log("boo2-1")
  //next()
}, function boo_user3(req, res, next){
  console.log("boo2-2")
  next()
})

// app.use('/boo', function boo_use(req, res, next) {
//   console.log("boo2")
//   next('route')
//   console.log("boo2-2")
// })

app.use('/boo', function boo_use(req, res, next) {
  console.log("boo3")
  next()
})

app.all('/too', function too_all(req, res, next) {
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
