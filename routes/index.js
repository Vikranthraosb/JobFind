var express = require('express');
var router = express.Router();
const userModel =require("./users");
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index',);
});


router.get('/register', function(req, res, next) {
  res.render("register");
});
router.post('/register', function(req,res,next){
  const data =new userModel({
    username: req.bosy.username,
    email: req.bosy.email,
    contact: req.bosy.contact
   
  })

userModel.register(data, req.body.password)
.then(function(registerduser){
  passport.authenticate("local")(req,res,function(){
    res.redirect('/profile');
  })
})
})

module.exports = router;




// 48 th minuit stoped 
// https://www.youtube.com/watch?v=y-dkusalYw0&t=2941s