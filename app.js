const HTTP = require('http')
const FS = require("fs")

const PORT = 3000
const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

const ERR_MSG_LISTEN = "Something went wrong"
const ERR_FILE_NOT_FOUND = "Error: File Not Found"
const SUCCESS_LISTEN_MSG = "Server is listening on port "

const FILE_NAME = "index.html"

const SERVER = HTTP.createServer(function (req, res) {
    res.writeHead(STATUS_OK, { "Content-Type": "text/html" })
    FS.readFile(FILE_NAME, function (error, data) {
        if (error) {
            res.writeHead(STATUS_NOT_FOUND)
            res.write(ERR_FILE_NOT_FOUND)
        } else {
            res.write(data)
        }
        res.end();
    })
})

SERVER.listen(PORT, function (error) {
    if (error) {
        console.log(ERR_MSG_LISTEN, error)
    } else {
        console.log(SUCCESS_LISTEN_MSG, PORT)
    }
})


