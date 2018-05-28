const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../models/index');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
const uuid = require('node-uuid');

require('dotenv').config();

const sessionMiddleware = session({
  genid(req) {
	return uuid.v4();
  },
  secret: process.env.SESSION_SECRET, // salt
  store: new redisStore({
	host: 'localhost', port: 6379, client, ttl: 260,
  }),
  expires: new Date(Date.now() + (30)),
  resave: false, // update session whenever there is a change only
  saveUninitialized: false, // create cookie only when a user is logged in
});

passport.use(new GoogleStrategy(
  {
	callbackURL: '/auth/google/callback',
	clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
	clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  },
  ((accessToken, refreshToken, profile, done) => {
	// // TODO try to use findOrCreate
	const profileDetail = profile._json;
	models.User.find({
	  where: {
		googleId: profileDetail.id,
	  },
	}).then((user) => {
	  if (!user) {
		models.User.create({
		  firstName: profileDetail.name.givenName,
		  lastName: profileDetail.name.familyName,
		  image: profileDetail.image.url,
		  googleId: profileDetail.id,
		}).then((user) => {
		  session.user = user;
		  return done(null, profile);
		});
	  } else {
		return done(null, profile);
	  }
	});
	return done(null, profile);
  })
));

passport.serializeUser((user, done) => {
  console.log('serialize....');
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  console.log('deserialize....');

  models.User.find({ where: { googleId: id } }).then((user) => {
	done(null, user);
  });
});

module.exports ={
	sessionMiddleware,
	passport,
}
