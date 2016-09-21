var express = require('express');
var router = express.Router();
var Wiki = require('./controllers/wiki');
var Tickets = require('./controllers/tickets');
var Todos = require('./controllers/todos');
var Auth = require('./controllers/auth');

router.route('/')
    .get((req, res)=> {
        return res.render('index');
    });

//WIKI
router.route('/wiki')
    .all(isAuthenticated)
    .get(Wiki.index);
router.route('/wiki/:id/edit')
    .all(isAuthenticated)
    .get(Wiki.edit);
router.route('/wiki/new')
    .all(isAuthenticated)
    .get(Wiki.new);
router.route('/wiki/save')
    .all(isAuthenticated)
    .post(Wiki.save);
router.route('/wiki/:id')
    .all(isAuthenticated)
    .get(Wiki.show);

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
        // req.session.returnTo = req.path;
        return res.redirect('/signin');
    }
}

module.exports = router;