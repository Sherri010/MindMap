// server and db setups
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var socket = require('socket.io')(server);

var db = require('./database.js');

// end points
app.use(express.static(__dirname + '/assets'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/assets/index.html');
})

socket.on('connect', function(client){
	console.log('Client connected...');

	client.on('join', function(data){
		console.log(data);
	})
})

server.listen(4567, function() {console.log('Listening on 4567...')});
