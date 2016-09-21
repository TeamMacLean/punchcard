const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const rethinkSession = require('session-rethinkdb')(session);
const LdapStrategy = require('passport-ldapauth');
const config = require('./config.json');

app.use(morgan('combined'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(require('less-middleware')('./public'));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//SETUP SESSIONS
const r = require('./lib/thinky').r;
const store = new rethinkSession(r);
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.user != null) {
        res.locals.signedInUser = {};
        res.locals.signedInUser.username = req.user.username;
        res.locals.signedInUser.name = req.user.name;
        res.locals.signedInUser.mail = req.user.mail;
        if (req.user.iconURL) {
            res.locals.signedInUser.iconURL = req.user.iconURL;
        }
    }
    return next();
});


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
passport.use(new LdapStrategy({
    server: {
        url: config.ldap.url,
        bindDn: config.ldap.bindDn,
        bindCredentials: config.ldap.bindCredentials,
        searchBase: config.ldap.searchBase,
        searchFilter: config.ldap.searchFilter
    }
}, (userLdap, done) => {
    const user = {
        id: userLdap.sAMAccountName,
        username: userLdap.sAMAccountName,
        name: userLdap.name,
        mail: userLdap.mail,
        memberOf: userLdap.memberOf
    };

    if (config.users.indexOf(user.username) > -1) {
        return done(null, user);
    } else {
        return done('You are not allowed to access the site, sorry.', null);
    }

}));


app.use(routes);

module.exports = app;