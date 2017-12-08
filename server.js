// server and db setups
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var socket = require('socket.io')(server);
// var db = require('./database.js');
var models = require('./server/models/index');

// end points
app.use(express.static(__dirname + '/assets/'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/assets/index.html');
});

// setting up the socket
socket.on('connect', function(client){
	console.log('Client connected...');
	models.Blob.create({
		name: 'sherri',
		age: false
	}).then(function(blob){
		console.log('created', blob.name, blob.age);
	});

	models.Blob.findAll({}). then(function(blobs){
		console.log('blobs', blobs);
	});


	client.on('join', function(data){
		console.log('client said...', data);
	})
})

server.listen(4567, function() {console.log('Listening on 4567...')});
