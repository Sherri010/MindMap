import io from 'socket.io-client';

const socket = io.connect('http://localhost:4567', { rejectUnauthorized : false });
const socketsMap = {};

export default class Socket{
    constructor(namespace){
        this.socket = this.getSocket(namespace);
    }

    getSocket = (namespace) => {
        return socketsMap[namespace] ? socketsMap[namespace] : socketsMap[namespace] = io.connect(`http://localhost:4567/${namespace}`, { rejectUnauthorized : false });
    }

    emit = (namespace, props) => {
		return new Promise((resolve, reject) => {
			this.socket.emit(namespace, props, (res, err) => {
				if (err){
					return reject(err);
				}
				resolve(res);
			});
		});
	}

    on = (namespace, cb) => {
		this.socket.on(namespace, cb);
	}
}
