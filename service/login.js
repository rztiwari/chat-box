//All imports
var User = require('../dao/login');

//Define service
var LoginService = {};

//Define service methods

/**@insertUser - writes the new user into the database
After successful write call the callback
On failure - callback is called with error.*/
LoginService.insertUser = function(options, callback){
  var user = new User({
      userName: options.userName,
      password: options.password,
      email: options.email,
      fullName: options.fullName
    });

    //schema instance .save to save using mongoose
    user.save(function(err){
      if(err) callback('Save unsuccessful!');
      callback(null, 'successful');
    });
};

/**@findUser - Find the user from the provided credentials
read the database with credentials - if matched pass the user
On failure - callback is called with error.*/
LoginService.findUser = function(options, callback){
  User.findOne({userName: options.userName, password: options.password}, function(err, user){
    if(err){
      callback('Find user failed');
    }else{
      callback(null, user);
    }
  });
};

//Export the service
module.exports = LoginService;
