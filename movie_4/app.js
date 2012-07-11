var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

	socket.on('sendchat', function (data) {
		io.sockets.emit('updatechat', data);
	});
});