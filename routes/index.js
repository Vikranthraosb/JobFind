var express = require('express');
var router = express.Router();
const userModel =require("./users");
const postModel =require("./post");

const passport = require('passport');
const upload =require("./multer")

//below is local statergy for login and logout purpose
const localStratergy =require('passport-local');
passport.use(new localStratergy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index',{nav:false});
});

router.get('/add',isLoggedIn, async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
  res.render('add',{nav:true});
});

router.get('/createpost',isLoggedIn, upload.single("postimage"), async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
   const post= await postModel.create({
    user: user._id,
    title: req.body.title,
    description:req.body.description,
    image: req.file.filename
  });
  user.posts.push(post._id);
await user.save();
res.redirect("/profile");
});

router.get('/register', function(req, res, next) {
  res.render("register",{nav:false});
});

router.get('/profile',isLoggedIn,async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})

  res.render("profile",{user, nav : true});
});

// form here to till down, its register, login logout
router.post('/fileupload', isLoggedIn, upload.single("image"), async function(req, res, next){
const user =await userModel.findOne({username: req.session.passport.user})
user.ProfileImage= req.file.filename;
await user.save();
res.redirect("./profile");

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
    res.redirect('/profile',{nav:true});
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
      res.redirect('/',{nav:false});
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