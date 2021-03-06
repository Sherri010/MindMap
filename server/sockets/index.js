const { sessionMiddleware, server } = require('../app.js');
var models = require('../models/index');

var io = require('socket.io')(server);
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

var users = io.of('/users');
var notebooks = io.of('/notebooks');

io
.of('/users')
.on('connection', function(socket){
    socket.on('get', function(data, cb){
        models.User.find({
            where: {
                id: socket.request.session.userId,
            }
        }).then(function(user){
            if(user){
                 cb(user)
            }
            else {
                throw new Error('User not found');
            }
        });
    });
});


io
.of('/notebooks')
.on('connection', function(socket){
    socket.on('search', function({ UserId }, cb){
        models.Notebook.findAll({
            where: {
                UserId,
            }
        }).then(function(notebooks = []){
                if(notebooks){
                    cb({ notebooks })
                }
                else {
                    cd([]);
                }
            });
    });

	socket.on('patch', function({ id, updates: { content } }, cb){
		models.Notebook.find({
			where: {
				id,
			}
		}).then(function(notebook){
			notebook.update({ content }).then(() => {
				notebook.reload().then(() => {
					cb({ notebook });
				});
			});
		});
	});
});
