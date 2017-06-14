var User = require('../dao/login');

var LoginService = {};
LoginService.insertUser = function(options, callback){
  var user = new User({
      userName: options.userName,
      password: options.password,
      email: options.email,
      fullName: options.fullName
    });

    user.save(function(err){
      if(err) callback('Save unsuccessful!');
      callback(null, 'successful');
    });
};

LoginService.findUser = function(options, callback){
  User.findOne({userName: options.userName, password: options.password}, function(err, doc){
    if(err){
      callback('Find user failed');
    }else{
      callback(null, doc);
    }
  });
};

module.exports = LoginService;
