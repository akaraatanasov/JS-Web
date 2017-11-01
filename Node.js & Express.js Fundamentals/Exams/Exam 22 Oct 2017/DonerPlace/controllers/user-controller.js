const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    register: {
        get: (req, res) => {
            res.render('user/register')
        },
        post: (req, res) => {
            let userData = req.body
        
            if (userData.password && userData.password !== userData.confirmedPassword) {
                console.log('Passwords do not match')
                res.render('user/register', userData)
                return
            }
        
            let salt = encryption.generateSalt()
            userData.salt = salt
        
            if (userData.password) {
                userData.hashedPass = encryption.generateHashedPassword(salt, userData.password)
            }
    
            User.create(userData)
                .then(user => {
                    req.logIn(user, (err, user) => {            
                        res.redirect('/')
                    })
                })
                .catch(error => {
                    userData.error = error
                    res.render('user/register', userData)
                })
        }
    },
    login: {
        get: (req, res) => {
            res.render('user/login')
        },
        post: (req, res) => {
            let userData = req.body
        
            User.findOne({ username: userData.username }).then(user => {
                if (!user || !user.authenticate(userData.password)) {
                    console.log('Wrong credentials!')
                    res.render('user/login')

                    return
                }
        
                req.logIn(user, (err, user) => {
                    if (err) {
                        console.log('Wrong credentials!')
                        res.render('user/login')
                        
                        return
                    }
            
                    res.redirect('/')
                })
            })
        }
    },
    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    },
    getOrders: (req, res) => { // TO DO !!!
        let currentUser = req.params._id

        Orders.find({}).where('creator').equals(currentUser)
            .populate('').populate('')
            .then((orders) => {
            console.log(orders)
            console.log()

            res.render('users/profile', orders)
        })
    }
};