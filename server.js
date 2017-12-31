const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
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

//auth
passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/redirect',
		clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
	},
	function(accessToken, refreshToken, profile, done) {
		console.log('accessToken', profile._json.name.givenName,profile._json.name.familyName);
		const profileDetail = profile._json;

		models.User.find({
			where: {
				googleId: profileDetail.id,
			}
		}).then(function(user){
			console.log('--------------user', user)
			if(!user){
				models.User.create({
						firstName: profileDetail.name.givenName,
						lastName: profileDetail.name.familyName,
						image: profileDetail.image.url,
						googleId: profileDetail.id,
				}).then(function(user) {
						console.log('currentUERSER', user)

						return done();
				});
				console.log('after')
			}
		})



	// 	models.User
  // .findOrCreate({where: { googleId: profileDetail.id,}, defaults: {
	// 	fistName: profileDetail.name.givenName,
	// 	lastName: profileDetail.name.familyName,
	// 	image: profileDetail.image.url,
	// 	googleId: profileDetail.id,
	// }})
  // .spread((user, created) => {
  //   console.log(created)
  // })
	return done();
}));


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


app.get('/auth/google/redirect',
  passport.authenticate('google', { scope: ['profile'], failureRedirect: '/' }),
  function(req, res) { console.log('in call back')
    res.redirect('/');
  });

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
	})

});

server.listen(4567, function() {console.log('Listening on 4567...')});
