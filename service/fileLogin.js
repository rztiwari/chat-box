//All imports
var fs = require('fs');

//Define service
var LoginService = {};

//Define service methods

/* Note: All operations are asynchronous
We could do the operations synchronously but that could hang the process,
till the read/ write operation ends, thus slowing down the response*/

/**@insertUser - writes the new user into the file system
After successful write call the callback
On failure - callback is called with error.*/
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

/**@findUser - Find the user from the provided credentials
Parse the file system to read the credentials - if matched pass the user
On failure - callback is called with error.*/
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

// Helper function
// Note - This function has not be exposed to the world
// Encapsulation pattern
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
        // Create the user object back
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

//Export the service
module.exports = LoginService;
