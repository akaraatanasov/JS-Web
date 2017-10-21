const controllers = require('../controllers')
const auth = require('./auth')

module.exports = app => {
  app.get('/', controllers.home.get)

  app.get('/user/register', controllers.user.register.get)
  app.post('/user/register', controllers.user.register.post)

  app.post('/user/logout', controllers.user.logout)

  app.get('/user/login', controllers.user.login.get)
  app.post('/user/login', controllers.user.login.post)

  app.get('/user/find', auth.isAuthed, controllers.user.find)

  app.get('/thread/:username', auth.isAuthed, controllers.thread.chatRoom.get)
  app.post('/thread/:username', auth.isAuthed, controllers.thread.chatRoom.post)

  app.get('/user/:userId/:block', auth.isAuthed, controllers.user.block)
  app.get('/user/:userId/:unblock', auth.isAuthed, controllers.user.unblock)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
