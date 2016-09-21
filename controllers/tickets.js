var Tickets = {};

const renderError = require('../lib/renderError');

Tickets.index = (req, res)=> {
    return res.render('tickets/index');
};


module.exports = Tickets;