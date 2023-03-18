const http = require("http")

function handleRequest(req, res) {
    console.log(req)
}

http.createServer(handleRequest)

Server.listen(3003)