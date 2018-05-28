const { server } = require('../app.js');
const { sessionMiddleware } = require('../services/authentication');
const models = require('../models/index');
const io = require('socket.io')(server);

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

const users = io.of('/users');
const notebooks = io.of('/notebooks');

io
  .of('/users')
  .on('connection', (socket) => {
    socket.on('get', (data, cb) => {
      models.User.find({
        where: {
          id: socket.request.session.userId,
        },
      }).then((user) => {
        if (user) {
          cb(user);
        } else {
          throw new Error('User not found');
        }
      });
    });
  });


io
  .of('/notebooks')
  .on('connection', (socket) => {
    socket.on('search', ({ UserId }, cb) => {
      models.Notebook.findAll({
        where: {
          UserId,
        },
      }).then((notebooks = []) => {
        if (notebooks) {
          cb({ notebooks });
        } else {
          cd([]);
        }
      });
    });

    socket.on('patch', ({ id, updates: { content } }, cb) => {
      models.Notebook.find({
        where: {
          id,
        },
      }).then((notebook) => {
        notebook.update({ content }).then(() => {
          notebook.reload().then(() => {
            cb({ notebook });
          });
        });
      });
    });

    socket.on('post', ({ name }, cb) => {
      models.Notebook.create({
        name,
		UserId: socket.request.session.userId,
      }).then((notebook) => {
        notebook.reload().then(() => {
          cb({ notebook });
        });
      });
    });
  });
