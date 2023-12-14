var express = require('express');
var router = express.Router();
const userModel =require("./users");
const passport = require('passport');
const upload =require("./multer")

//below is local statergy for login and logout purpose
const localStratergy =require('passport-local');
passport.use(new localStratergy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index',);
});


router.get('/register', function(req, res, next) {
  res.render("register");
});

router.get('/profile', function(req, res, next) {
  res.render("profile");
});

// form here to till down, its register, login logout
router.post('/fileupload', isLoggedIn, upload.single("image"), function(req, res, next){
  res.send("uploaded");
  });

router.post('/register', function(req,res,next){
  const data =new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact
  })


  
userModel.register(data, req.body.password)
.then(function(registerduser){
  passport.authenticate("local")(req,res,function(){
    res.redirect('/profile');
  })
})
})

router.post('/login', passport.authenticate("local",{
  successRedirect :"/profile",
failureRedirect: "/"
}),function(req, res){}
);


router.get("/logout",function(req,res,next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  
})


function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}




module.exports = router;




// https://www.youtube.com/watch?v=y-dkusalYw0&t=2941s