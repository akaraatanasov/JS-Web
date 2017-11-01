const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')

module.exports = {
    getOrder: (req, res) => {
        let id = req.params
        
        Product.findById(id)
            .then(product => {
                res.render('order/order', {data: product})
            })
    }
}