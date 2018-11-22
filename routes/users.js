var express = require('express');
var router = express.Router();
var User  = require('../models/user-model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//create new user
router.post('/', function(req, res, next){
  console.log(req.body)
  if(req.body.username && req.body.password){

    var userData = {
      username: req.body.username,
      password: req.body.password,
    } 
    User.create(userData, function (err,user) {
      if (err) {
        return next(err);
      } else {
        console.log('saved to db')
        req.session.userId = user._id;
        return res.redirect('/dashboard');
      }
    })

  } else{
    var err = new Error('All fields1 required.');
    err.status = 400;
    return next(err);
  }

})

module.exports = router;
