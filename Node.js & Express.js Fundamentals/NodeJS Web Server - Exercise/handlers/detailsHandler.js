const fs = require('fs');
const qs = require('querystring');
const db = require('./../config/dataBase');

module.exports = (req, res) => {
    if ((req.pathname.startsWith('/viewAllMovies/details/')) && req.method === 'GET') {
        let detailsIndex = req.pathname.split('/viewAllMovies/details/')[1];
        detailsIndex = Number(detailsIndex) - 1;
        
        fs.readFile('./views/details.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            
            let posterObj = qs.parse(db[detailsIndex].moviePoster);
            let titleObj = qs.parse(db[detailsIndex].movieTitle);
            let yearObj = qs.parse(db[detailsIndex].movieYear);
            let descriptionObj = qs.parse(db[detailsIndex].movieDescription);

            let poster = Object.keys(posterObj)[0];
            let title = Object.keys(titleObj)[0];
            let year = Object.keys(yearObj)[0];
            let description = Object.keys(descriptionObj)[0];

            let details = `<div class="content">
            <img src="${poster}" alt=""/></br>
            <h3>Title  ${title}</h3>
            <h3>Year ${year}</h3>
            <p> ${description}</p>
            </div>`;

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', details);
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