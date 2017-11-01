const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')

module.exports = {
    addProduct: {
        get: (req, res) => {
            res.render('admin/add')
        },
        post: (req, res) => {
            let category = req.body.category
            let imageUrl = req.body.imageUrl
            let size = Number(req.body.size)
            let toppings = req.body.toppings.split(', ')

            let productData = {
                category,
                imageUrl,
                size,
                toppings
            }

            Product.create(productData)
                .then(prdctContent => {
                    res.redirect(`/`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}