var net = require('net');

//Array to store connections
var sockets = [];

//The server
var s = net.Server(function(socket) {
	//push to array for broadcast
	sockets.push(socket);

	//broadcast on data to sockets
	socket.on('data', function(d) {
		//loop the array of sockets
		for ( var i = 0; i< sockets.length; i++){
			//Do not send to the requesting socket
			if(sockets[i] == socket) continue;
			//send to all the rest of the sockets
			sockets[i].write(d);
		}
	});

	//remove the sockets that disconects
	socket.on('end', function() {
		//find socket to remove
		var i = sockets.indexOf(socket);
		//remove socket
		sockets.splice(i, 1);
	});
});

s.listen(8000);