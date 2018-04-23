const { server } = require('./app');
require('./sockets/index.js');

server.listen(4567, function() {console.log('Listening on 4567...')});
