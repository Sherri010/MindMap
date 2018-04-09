const { sessionMiddleware, server } = require('../app.js');

var io = require('socket.io')(server);
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

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
