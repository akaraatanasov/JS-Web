const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
    toppings: [{ type: mongoose.Schema.Types.String, default: [] }],
    status: { type: mongoose.Schema.Types.String, default: 'Pending'}
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;