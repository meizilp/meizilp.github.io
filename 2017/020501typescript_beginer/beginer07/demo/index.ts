import * as express from "express"
import * as http from "http"
import fibo from "./fibo"

let count = 0
function read(res) {
  ++count
  console.log(`count plused:${count}`)
  if (count == 1) {
    console.log("prepare get")
    try {
      http.get("http://www.google.com", (gres) => {
        console.log("Got over")
        res.send('Http Over')
      }).setTimeout(5000)
    } catch (e) {
      console.log(e)
    }
    console.log("get over")
  } else {
    res.send(count.toString())
  }
}

let app = express()

app.get('/', function (req, res) {
  res.send('Hello Express!')
})

app.get('/g', (req, res) => {
  console.log('G request')
  read(res)
  console.log('G request over')
})

let tcount = 0
app.get('/t', (req, res) => {
  ++tcount
  console.log('T request' + tcount)
  setTimeout(function () {
    console.log("prepare fibo")
    //console.log('fibo' + fibo(41))
    //res.send('Timeout' + tcount)
  }, 5000);
  console.log('T request over' + tcount)
})

let fcount = 0
app.get('/f', async (req, res) => {
  ++fcount
  console.log('F request' + fcount)
  console.log('fibo' + fibo(41))
  res.send(`F count:${count}`)
  console.log('F request over' + fcount)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
