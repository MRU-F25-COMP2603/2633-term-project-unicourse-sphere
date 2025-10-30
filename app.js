const HTTP = require('http');
const FS = require("fs");

const PORT = 3000;
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const FILE_NAME = "index.html";

function createServer() {
    return HTTP.createServer(function (req, res) {
        res.writeHead(STATUS_OK, { "Content-Type": "text/html" });
        FS.readFile(FILE_NAME, function (error, data) {
            if (error) {
                res.writeHead(STATUS_NOT_FOUND);
                res.write("Error: File Not Found");
            } else {
                res.write(data);
            }
            res.end();
        });
    });
}

// Only start server if file is run directly
if (require.main === module) {
    const server = createServer();
    server.listen(PORT, function (error) {
        if (error) {
            console.log("Something went wrong", error);
        } else {
            console.log("Server is listening on port", PORT);
        }
    });
}

module.exports = { createServer };
