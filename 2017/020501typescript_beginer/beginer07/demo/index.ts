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
  next()
})

app.all('/too', (req, res, next) => {
  next()
})

app.get("/icon", (req, res) => {
  res.json(req.params)
})

app.use('/birds', birds)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
