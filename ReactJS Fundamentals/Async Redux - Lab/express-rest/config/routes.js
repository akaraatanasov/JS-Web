const controllers = require('../controllers');

module.exports = app => {
    app.get('/data', controllers.data.get);
    app.post('/data', controllers.data.post);

    app.get('/contacts', controllers.contacts.get);
    app.get('/contacts/:id', controllers.contacts.getById);
    app.post('/contacts', controllers.contacts.post);
    app.post('/contacts/:id', controllers.contacts.update);

    app.all('*', (req, res) => {
        res.status(404);
        res.end('404 Not Found');
    });

    /*
    app.get('*', (req, res) => {
        res.end('./static/index.html');
    });
    */
};