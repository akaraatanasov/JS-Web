const fs = require('fs');
const qs = require('querystring');
const db = require('./../config/dataBase');

module.exports = (req, res) => {
    if ((req.pathname === '/viewAllMovies') && req.method === 'GET') {
        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let posters = '';

            for (movieIndex in db) {
                let posterObj = qs.parse(db[movieIndex].moviePoster);
                let posterLink = Object.keys(posterObj)[0];
                
                posters += `<a href="/viewAllMovies/details/${++movieIndex}"><div class="movie"><img class="moviePoster" src="${posterLink}"/></div></a>`;          
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', posters);
            res.writeHead(200, {
                'content-type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}