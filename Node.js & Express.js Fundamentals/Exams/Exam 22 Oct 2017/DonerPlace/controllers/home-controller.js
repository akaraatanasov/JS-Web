const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')

module.exports = {
    get: async (req, res) => {
        let error = req.query.error
        let data = {
            chicken: [],
            beef: [],
            lamb: []
        }

        data.chicken = await Product.find({ category: 'chicken' })
        data.beef = await Product.find({ category: 'beef' })
        data.lamb = await Product.find({ category: 'lamb' })

        if (req.user) {
            if (req.user.roles[0] === 'Admin') {
                res.render('admin/index-admin', {data: data})
            } else {
                res.render('home/index', {data: data})
            }
        } else {
            res.render('home/index', {data: data})
        }
    }
}