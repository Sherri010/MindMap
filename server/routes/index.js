
const { ensureAuthenticated, passport } = require('../services/authentication');
const rootPath = __dirname.replace(/\/server.*$/, '');

module.exports = (app) => {
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

	app.get(/\/personalLibrary.*$/, ensureAuthenticated, (req, res) => {
	  req.session.userId = req.user.id;
	  res.sendFile(`${rootPath}/assets/index.html`);
	});

	app.get('/logout', ensureAuthenticated, (req, res) => {
	  req.logout();
	  res.redirect('/');
	});
}
