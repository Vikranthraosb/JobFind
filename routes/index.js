var express = require('express');
var router = express.Router();
const userModel =require("./users")

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

})

module.exports = router;
