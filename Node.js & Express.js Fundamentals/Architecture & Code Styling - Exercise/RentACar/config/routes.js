const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    //app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    
    app.post('/logout', controllers.user.logout);
    
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    //Admin functions
    //app.get('/addCar', restrictedPages.hasRole('Admin'), controllers.admin.addCarView);
    //app.post('/addCar', restrictedPages.hasRole('Admin'), controllers.admin.createCar);

    app.get('/addCar', controllers.admin.addCarView);
    app.post('/addCar', controllers.admin.createCar);

    //Query functions
    app.get('/viewAll', controllers.query.queryAll);
    
    //Rent functions
    app.get('/details/:id', controllers.rent.getRentDetails);
    app.post('/rent/:id', controllers.rent.rentCar)

    //Profile
    app.get('/userProfile/:id', controllers.user.getProfile)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};