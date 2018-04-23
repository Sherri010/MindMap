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
    console.log('USER connected...');

    socket.on('get', function(data, cb){
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
                name: 'sherri sockets',
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

});
