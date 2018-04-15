import io from 'socket.io-client';

const socket = io.connect('http://localhost:4567', { rejectUnauthorized : false });
const socketsMap = {};

// socket.on('connection', function () {
//     socket.emit('greet', { message: 'client connets' });
// });
// /, { showAutoConfirmed = false, showSuccess = false, showError = true, modalProps, showConfirmation = true } = {}

export default class Socket{
    constructor(namespace){
        this.socket = this.getSocket(namespace);
    }

    getSocket = (namespace) => {
        return socketsMap[namespace] ? socketsMap[namespace] : socketsMap[namespace] = io.connect(`http://localhost:4567/${namespace}`, { rejectUnauthorized : false });
    }

    emit = (namespace, props) => {
        console.log('EMIT', this.socket)
		return new Promise((resolve, reject) => {
			this.socket.emit(namespace, props, (err, res) => {
                console.log('inside')
				if (err){
					return reject(err);
				}

				resolve(res);
			});
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return Promise.reject(err);
		});
	}

    on = (namespace, cb) => {
		this.socket.on(namespace, cb);
	}

}
