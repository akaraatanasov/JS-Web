const contacts = require('../config/data.json');

module.exports = {
    get: (req, res) => {
        setTimeout(() => {
            res.json({contacts});
        }, 2000);
    },
    getById: (req, res) => {
        setTimeout(() => {
            const contact = contacts.filter(c => c.id === req.params.id);
            console.log(req.params);
            res.json(contact);
        }, 2000);
    },
    post: (req, res) => {
        console.log('Received data:');
        console.log(req.body.data);
        res.end();
    },
    update: (req, res) => {
        console.log('Received data for: ' + req.params.id);
        console.log(req.body);
        const contact = contacts.filter(c => c.id === req.params.id)[0];
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.phone = req.body.phone;
        contact.email = req.body.email;
        res.end();
    }
};