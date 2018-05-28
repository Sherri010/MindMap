const path = require('path');
const appDir = path.dirname(require.main.filename);
// loads environment variables from a .env file into process.env.
require('dotenv').config();

// server and db setups
const express = require('express');

const app = express();
const server = require('http').Server(app);
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const bodyParser = require('body-parser');

const rootPath = __dirname.replace('/server', '');
const { passport, sessionMiddleware } = require('./services/authentication');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(express.static(`${rootPath}/assets/`));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
	  return next();
  }
  res.redirect('/');
}

app.get('/', (req, res) => {
  res.sendFile(`${rootPath}/assets/index.html`);
});


app.get(
  '/login',
  passport.authenticate(
    'google',
    {
      scope: ['profile', 'email'],
      failureRedirect: '/',
    }
 ));


app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/faildlogin' }),
  (req, res) => {
    res.redirect('/personalLibrary');
 });

app.get('/personalLibrary(/*)?', ensureAuthenticated, (req, res) => {
  req.session.userId = req.user.id;
  res.sendFile(`${rootPath}/assets/index.html`);
});

app.get('/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = {
  app,
  server,
};
