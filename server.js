var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
// server and db setups
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var socket = require('socket.io')(server);
var models = require('./server/models/index');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/assets/'));

///////////////////auth

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
		done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
		models.User.find({where: { googleId: id } }).then(function(user){
				done(null,user);
		});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/callback',
		clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
	},
	function(accessToken, refreshToken, profile, done) {
				// // TODO try to use findOrCreate
				const profileDetail = profile._json;
				models.User.find({
					where: {
						googleId: profileDetail.id,
					}
				}).then(function(user){
					if(!user){
						models.User.create({
							firstName: profileDetail.name.givenName,
							lastName: profileDetail.name.familyName,
							image: profileDetail.image.url,
							googleId: profileDetail.id,
						}).then(function(user){
							return done(null, profile);
						})
					}
					else {
						return done(null, profile);
					}
				});

				return done(null, profile);
}));

///////////////////////////////
//session
app.use(session({
	secret: process.env.SESSION_SECRET, //salt
	resave: false, // update session whenever there is a change only
	saveUninitialized: false, //create cookie only when a user is logged in
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/assets/index.html');
});


////////////////
//auth
///////////////
// TODO fix the path to match the callback
app.get('/login',
  passport.authenticate(
		'google',
		{
			scope: ['profile', 'email'],
			failureRedirect: '/',
}));


app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/faildlogin' }),
  function(req, res) {
    res.redirect('/personalLibrary');
});

app.get('/personalLibrary', ensureAuthenticated,function(req,res){
	console.log('user stored in session', req.session.passport.user)
	res.redirect('/');
})

app.get('/logout', ensureAuthenticated, function (req, res) {
	console.log('USER',req.session.passport.user, 'is logging out');
  req.session.passport.user = null;
  res.redirect('/');
});

/////////////
///sockets
/////////////
// setting up the socket
socket.on('connect', function(client){
	console.log('Client connected...');

	client.on('join', function(data){
		console.log('client said. join..', data);
	});

	client.on('tag', function(data){
		console.log('client TAG said tag...', data);
	});

	client.on('noteBook', function(data, cb){
		models.Notebook.create({
	    name: data.name,
	  }).then(function(notebook) {
	    console.log('created', notebook);
			cb(notebook);
	  });
	});
});

server.listen(4567, function() {console.log('Listening on 4567...')});
