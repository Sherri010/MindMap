var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// loads environment variables from a .env file into process.env.
require('dotenv').config();

// server and db setups
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var models = require('./server/models/index');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var redis   = require("redis");
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();

var sessionMiddleware = session({
	secret: process.env.SESSION_SECRET, //salt
	store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
	resave: false, // update session whenever there is a change only
	saveUninitialized: false, //create cookie only when a user is logged in
});

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(express.static(__dirname + '/assets/'));

// session
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

server.listen(4567, function() {console.log('Listening on 4567...')});

/////////////
///sockets
/////////////

io.on('connection', function(socket){
	console.log('Client connected...');

	socket.on('user', function(data, cb){
		console.log('USER SOCKET', socket.request.session)
		let user;
		models.User.find({
			where: {
				id: socket.request.session.userId,
			}
		}).then(function(user){
			if(user){
				 cb(user)
			}
			else {
				// res.status(500).send('No User Found');
				cb('No User Found')
			}
		});
	});
});



///////////////////auth

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	console.log('serialize....')
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	console.log('deserialize....')

	models.User.find({where: { googleId: id } }).then(function(user){
		done(null,user);
	});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
	  console.log('is authenticate')
	  return next();
  }
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
							session.user = user;
							return done(null, profile);
						})
					}
					else {
						return done(null, profile);
					}
				});
				return done(null, profile);
}));


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
		}
	)
);


app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/faildlogin' }),
  function(req, res) {
	  console.log('AUTHENTICATE ', req.user)
    res.redirect('/personalLibrary');
});

app.get('/personalLibrary',function(req,res){
	req.session.userId = req.user.id;
	res.sendFile(__dirname + '/assets/index.html');
});


// TODO make this a protected route
app.get('/user', function(req,res){
	const userId = req.session.user.id;
	models.User.find({
		where: {
			id: userId,
		}
	}).then(function(user){
		if(user){
			res.send(user);
		}
		else {
			res.status(500).send('No User Found');
		}
	});
});


app.get('/logout', ensureAuthenticated, function (req, res) {
	console.log('USER',req.session.passport.user, 'is logging out');
 //  	req.session.passport.user = null;
	// req.session.user = null;
	console.log('LOGOUT', req.user)
	req.logout()
  	res.redirect('/');
});
