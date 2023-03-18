const http = require("http")

function handleRequest(req, res) {
    console.log(req.url, req.headers, req.method)
}

const server = http.createServer(handleRequest)

server.listen(3003)