// All imports
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// PORT
var PORT = process.env.PORT || 3001;

// Static file serving
app.use(express.static('public'));

// Base/ index routing
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Socket connection and chat logic
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('user joined', function(user){
    io.emit('user joined', user);
  });
});

// http port listning
http.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});
