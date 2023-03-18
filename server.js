const http = require("http")

function handleRequest(req, res) {
    console.log(req.url, req.headers, req.method)
}

http.createServer(handleRequest)

server.listen(3003)