// All imports
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

//Application Imports - Here service imports
var LoginService = require('./service/fileLogin');

// Applying different colors to the user to differentiate them
var colours = [
  'red',
  'blue',
  'green',
  'black',
  'orange',
  'brown'
];
var count = 0;

// PORT
var PORT = process.env.PORT || 3001;

// Static file serving
app.use(express.static('public'));

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({extended: true}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

//Set view engine as pug.
app.set('view engine', 'pug');

/* Base index routing
Routes to the home page - In this case the login page*/
app.get('/', function(req, res) {
  res.render('index');
});

/* Login API
Log in the user and if the process is successful
connect the user to the current chat instance */
app.post('/login', function(req, res) {
  var userName = req.body.loginName,
    password = req.body.password,
    fullName,
    user,
    options = {};

  options.userName = userName;
  options.password = password;
  LoginService.findUser(options, function(err, user) {
    if (err) {
      res.render('index', {message: 'Login failed! Please try again.'});
    } else {
      fullName = user.fullName;
      io.emit('user joined', fullName);
      res.render('chat', {
        userName: fullName,
        color: colours[count]
      });
      count++;
      if (count === 6) {
        count = 0;
      }
    }
  });
});

/*Registration API
Any user registered can log in back to the application
to connect to the current chat instance*/
app.post('/register', function(req, res) {
  var userName = req.body.userName,
    password = req.body.password,
    confirmPassword = req.body.confirmPassword,
    email = req.body.email,
    fullName = req.body.fullName,
    options = {};
  if (password === confirmPassword) {
    options.userName = userName;
    options.password = password;
    options.email = email;
    options.fullName = fullName;
    LoginService.insertUser(options, function(err, message) {
      if (err)
        throw err;
      res.render('index', {message: 'Registration successful! Please login again.'});
    });
  } else {
    res.render('index', {
      message: 'Registration failed! Please try again.',
      registration: true
    });
  }
});

// Socket connection and chat logic
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

// http port listning
http.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});
