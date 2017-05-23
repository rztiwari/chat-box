// All imports
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

// PORT
var PORT = process.env.PORT || 3001;

// Static file serving
app.use(express.static('public'));

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

//Set view engine as pug.
app.set('view engine', 'pug');

// Base/ index routing
app.get('/', function(req, res){
  res.render('index');
});

app.post('/login', function(req, res){
  io.emit('user joined', req.body.loginName);
  res.render('chat', {userName: req.body.loginName});
});

// Socket connection and chat logic
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// http port listning
http.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});
