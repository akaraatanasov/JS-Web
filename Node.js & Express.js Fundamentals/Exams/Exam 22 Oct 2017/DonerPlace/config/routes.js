const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.get)
    
    app.get('/register', controllers.user.register.get)
    app.post('/register', controllers.user.register.post)
  
    app.get('/logout', controllers.user.logout)
  
    app.get('/login', controllers.user.login.get)
    app.post('/login', controllers.user.login.post)

    app.get('/addProduct', restrictedPages.hasRole('Admin'), controllers.admin.addProduct.get);
    app.post('/addProduct', restrictedPages.hasRole('Admin'), controllers.admin.addProduct.post);

    app.get('/order/:orderId', restrictedPages.isAuthed, controllers.order.getOrder)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};