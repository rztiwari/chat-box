var fs = require('fs');

var LoginService = {};

LoginService.insertUser = function(options, callback) {
  var data = '~' + options.userName + '|' +
    options.password + '|' +
    options.email + '|' +
    options.fullName;
  fs.appendFile('users.txt', data, function(err) {
    if (err) throw err;
    callback(null, 'successful');
  });
};

LoginService.findUser = function(options, callback) {
  fs.readFile('users.txt', 'utf8', function(err, data) {
    if (err) {
      callback('File read failed');
    } else {
      user = getUser(data, options.userName, options.password);
      if (user) {
        callback(null, user);
      }else {
        callback('User not found');
      }
    }
  });
};

function getUser(data, userName, password) {
  var users, i, user, userData,
    str = data || '',
    usrNam, pass, match;
  users = str.split('~');
  for (i = 0; i < users.length; i++) {
    user = users[i];
    userData = user.split('|');
    if (userData && userData.length > 0) {
      usrNam = userData[0];
      pass = userData[1];
      if (usrNam === userName && pass === password) {
        match = {};
        match.userName = usrNam;
        match.password = pass;
        match.email = userData[2];
        match.fullName = userData[3];
        break;
      }
    }
  }
  return match;
}

module.exports = LoginService;
