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
                // res.status(500).send('No User Found');
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
// users.on('connection', function(){
//     console.log('USER connected...');
//
//     users.on('get', function(data, cb){
// 		console.log('USER SOCKET', socket.request.session)
// 		let user;
// 		models.User.find({
// 			where: {
// 				id: socket.request.session.userId,
// 			}
// 		}).then(function(user){
// 			if(user){
// 				 cb(user)
// 			}
// 			else {
// 				// res.status(500).send('No User Found');
// 				cb('No User Found')
// 			}
// 		});
// 	});
// });

// io.on('connection', function(socket){
// 	console.log('Client connected...');
//
//     users.on('get', function(data, cb){
//         console.log(' --------- GET', data)
//     });
//
//     notebooks.on('post', function(data, cb){
//         console.log(' --------- POST', data)
//
//     });
//
//     notebooks.on('search', function(data, cb){
//         console.log(' --------- SEARCH', data)
//
//     });

	// socket.on('user', function(data, cb){
	// 	console.log('USER SOCKET', socket.request.session)
	// 	let user;
	// 	models.User.find({
	// 		where: {
	// 			id: socket.request.session.userId,
	// 		}
	// 	}).then(function(user){
	// 		if(user){
	// 			 cb(user)
	// 		}
	// 		else {
	// 			// res.status(500).send('No User Found');
	// 			cb('No User Found')
	// 		}
	// 	});
	// });
    //
    // socket.on('userNoteBooks', function({ UserId }, cb){
    //     models.Notebook.findAll({
    //         where: {
    //             name: 'sherri sockets',
    //         }
    //     }).then(function(notebooks = []){
    //             if(notebooks){
    //                 cb({ notebooks })
    //             }
    //             else {
    //                 cd([]);
    //             }
    //         });
    // });
    //
    // socket.on('postNotebook', function({ name }, cb){
    //     models.Notebook
    //     .build({ name })
    //     .save()
    //     .then(function(notebook){
    //             cb({ notebook });
    //     })
    //     .catch(error => console.log(error))
    // });
// });
