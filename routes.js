var express = require('express');
var router = express.Router();
var Knowledge = require('./controllers/knowledge');
var Tickets = require('./controllers/tickets');
var Todos = require('./controllers/todos');
var Auth = require('./controllers/auth');

router.route('/')
    .get((req, res)=> {
        return res.render('index');
    });

//knowledge
router.route('/knowledge')
    .all(isAuthenticated)
    .get(Knowledge.index);
router.route('/knowledge/:id/edit')
    .all(isAuthenticated)
    .get(Knowledge.edit);
router.route('/knowledge/new')
    .all(isAuthenticated)
    .get(Knowledge.new);
router.route('/knowledge/save')
    .all(isAuthenticated)
    .post(Knowledge.save);
router.route(['/knowledge/:id', '/wiki/:id']) //support old route for now.
    .all(isAuthenticated)
    .get(Knowledge.show);

//TO DO
router.route('/todo')
    .all(isAuthenticated)
    .get(Todos.index);
router.route('/ticket')
    .all(isAuthenticated)
    .get(Tickets.index);

//TODO Tickets


//AUTH
router.route(['/signin', '/login'])
    .get(Auth.signIn)
    .post(Auth.signInPost);

router.route(['/signout', '/logout'])
    .get(Auth.signOut);

//MUST BE LAST!
router.route('*')
    .get((req, res) => {
        console.log('404', req.url);
        res.render('404');
    });

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.session.returnTo = req.path;
        return res.redirect('/signin');
    }
}

module.exports = router;