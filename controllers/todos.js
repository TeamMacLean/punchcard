var Todos = {};

const renderError = require('../lib/renderError');

Todos.index = (req, res)=> {
    return res.render('todo/index');
};


module.exports = Todos;