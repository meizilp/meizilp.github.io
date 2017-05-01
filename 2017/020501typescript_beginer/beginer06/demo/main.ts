import * as os from "os"
import * as http from "http"

console.log(os.platform())

let server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h1>Hello world!</h1>')
    res.end()
})

let port = 3000
server.listen(port)

console.log(`Server is running at port:${port}`)