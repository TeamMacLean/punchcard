const express = require('express');
const router = express.Router();
const Knowledge = require('./controllers/knowledge');
const Tickets = require('./controllers/tickets');
const Todos = require('./controllers/todos');
const Auth = require('./controllers/auth');

const multer = require('multer');

const upload = multer({dest: 'uploads/'});

router.route('/')
    .get((req, res) => {
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

router.route('/knowledge/:id/upload') //support old route for now.
    .all(isAuthenticated)
    .post(upload.single("newfile"), Knowledge.upload);

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

//DOWNLOAD

router.route('/download/:id')
    .all(isAuthenticated)
    .get(Knowledge.download);


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