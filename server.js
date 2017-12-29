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


passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/redirect',
		clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
	},
	function(accessToken, refreshToken, profile, done) {
		console.log('accessToken', profile);
	  //      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
	  //      //   return done(err, user);
	  //      // });
	  // }
	}
));

// end points
app.use(express.static(__dirname + '/assets/'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/assets/index.html');
});

// app.get('/login', passport.authenticate('google', {
// 	scope: ['profile'],
// 	failureRedirect: '/',
// }),function(req, res) {
// 	res.redirect('/');
// });

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
