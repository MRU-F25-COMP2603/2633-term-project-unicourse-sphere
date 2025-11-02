const CONSTANTS = require("./constants.js")
const HTTP = require('http');
const FS = require("fs");

function createServer() {
    return HTTP.createServer(function (req, res) {
        res.writeHead(CONSTANTS.STATUS_OK, { "Content-Type": "text/html" })
        FS.readFile(CONSTANTS.FILE_NAME, function (error, data) {
            if (error) {
                res.writeHead(CONSTANTS.STATUS_NOT_FOUND)
                res.write(CONSTANTS.ERR_MSG_FILE_NF)
            } else {
                res.write(data);
            }
            res.end();
        });
    });
}

// changed comment
if (require.main === module) {
    const server = createServer();
    server.listen(CONSTANTS.PORT, function (error) {
        if (error) {
            console.log("Something went wrong", error)
        } else {
            console.log("Server is listening on port", CONSTANTS.PORT)
        }
    })
}

module.exports = { createServer }
