const http = require('http');
const url = require('url');
const handlers = require('./handlers/index.js');
const port = 1337;

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;
    for (let i = 0; i < handlers.length; i++) {
        let handler = handlers[i];
        let result = handler(req, res);
        if (!result) {
            break;
        }
    }
}).listen(port);

console.log(`Server is listening to port ${port}`);