// All imports
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var fs = require('fs');

var colours = ['red', 'blue', 'green', 'black', 'orange', 'brown'];
var count = 0;

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

function getUserName(data, userName, password){
  var users, i, user, userData,
    str = data || '',
    usrNam, pass, match;
  users = str.split('~');
  for(i = 0; i < users.length; i++){
    user = users[i];
    userData = user.split('|');
    if(userData && userData.length > 0){
      usrNam = userData[0];
      pass = userData[1];
      if(usrNam === userName && pass === password){
        match = userData[3];
        break;
      }
    }
  }
  return match;
}

app.post('/login', function(req, res){
  var userName = req.body.loginName,
      password = req.body.password,
      fullName;
  fs.readFile('users.txt', 'utf8', function(err, data) {
    if (err) throw err;
    fullName = getUserName(data, userName, password);
    if(userName && password && fullName){
      io.emit('user joined', fullName);
      res.render('chat', {userName: fullName, color: colours[count]});
      count++;
      if(count === 6){
        count = 0;
      }
    }else{
      res.render('index', {message: 'Login failed! Please try again.'});
    }
  });
});

app.post('/register', function(req, res){
  var userName = req.body.userName,
      password = req.body.password,
      confirmPassword = req.body.confirmPassword,
      email = req.body.email,
      fullName = req.body.fullName,
      data;
  if(password === confirmPassword){
    data = '~' + userName + '|' + password + '|' + email + '|' + fullName;
    fs.appendFile('users.txt', data, function(err) {
      if (err) throw err;
      res.render('index', {message: 'Registration successful! Please login again.'});
    });
  } else {
    res.render('index', {message: 'Registration failed! Please try again.', registration: true});
  }
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
