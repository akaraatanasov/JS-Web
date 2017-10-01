const fs = require('fs');

module.exports = (req, res) => {
    if (req.path === '/favicon.ico') {
        fs.readFile('./favicon.ico', (err, data) => {
            if (err) {
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                'content-type': 'image/x-icon'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}