const Car = require('mongoose').model('Car')

module.exports = {
    addCarView: (req, res) => {
        res.render('adminPanel/createCarView');
    },
    createCar: (req, res, next) => {
        let carData = req.body

        let objForCreation = {
            brand: carData.brand,
            model: carData.model,
            image: carData.image,
            year: carData.year,
            creationDate: Date.now(),
            pricePerDay: carData.pricePerDay
        }

        Car.create(objForCreation).then(() => {
            res.redirect('/')
        });

    }
};