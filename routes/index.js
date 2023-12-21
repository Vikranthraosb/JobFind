var express = require('express');
var router = express.Router();
const userModel =require("./users"); 
const postModel =require("./post");
const userModel2 =require("./user2");
const postModel2 =require("./post2");

const passport = require('passport');
const upload =require("./multer")

//below is local statergy for login and logout purpose
const localStratergy =require('passport-local');
const post2 = require('./post2');
passport.use(new localStratergy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index',{nav:true});
});

router.get('/add',isLoggedIn, async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
  res.render('add',{nav:false});
});

router.get('/apply',isLoggedIn, async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
  res.render('apply',{nav:false});
});

router.post('/createpost',isLoggedIn, upload.single("postimage"), async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
   const post= await postModel.create({
    user: user._id,
    title: req.body.title,
    Description:req.body.Description,
    image: req.file.filename
  });
  user.posts.push(post._id);
await user.save();
res.redirect("/profile");
});

router.post('/applyjob',isLoggedIn, upload.single("postimage"), async function(req, res, next) {
  const user2 =await userModel.findOne({username: req.session.passport.user})
   const post2= await postModel2.create({
    user: user2._id,
    title: req.body.title,
    Description:req.body.Description,
    image: req.file.filename
  });
  user2.posts.push(post2._id);
await user2.save();
res.redirect("/profile");
});



//apply end

router.get('/register', function(req, res, next) {
  res.render("register",{nav:false});
});
router.get('/register2', function(req, res, next) {
  res.render("register2",{nav:false});
});
router.get('/login', function(req, res, next) {
  res.render("login",{nav:false});
});
router.get('/login2', function(req, res, next) {
  res.render("login2",{nav:false});
});
router.post('/login', passport.authenticate("local",{
  successRedirect :"/profile",
  failureRedirect: "/"
  }),function(req, res){}
  );
  router.post('/login2', passport.authenticate("local", {
    successRedirect: "/profile2",
    failureRedirect: "/"
}), function(req, res) {});

router.get('/profile',isLoggedIn,async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
.populate("posts")
  res.render("profile",{user, nav : true});
});
router.get('/profile2',isLoggedIn,async function(req, res, next) {
  const user2 =await userModel2.findOne({username: req.session.passport.user})
.populate("posts")
  res.render("profile2",{user2, nav : true});
});

router.get('/show/posts',isLoggedIn,async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
.populate("posts")
  res.render("show",{user, nav : true});
});
router.get('/feed',isLoggedIn,async function(req, res, next) {
  const user =await userModel.findOne({username: req.session.passport.user})
 const posts = await postModel.find()
.populate("user")
res.render("feed",{user, posts,nav:false})
});
// form here to till down, its register, login logout
router.post('/fileupload', isLoggedIn, upload.single("image"), async function(req, res, next){
const user =await userModel.findOne({username: req.session.passport.user})
user.ProfileImage= req.file.filename;
await user.save();
res.redirect("./profile");

});

// Register for userModel (assuming this is for a different type of user)
router.post('/register', function(req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    name: req.body.fullname
  });

  userModel.register(data, req.body.password, function(err, registeredUser) {
    if (err) {
      console.error(err);
      res.redirect('/registration-error');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/profile');
      });
    }
  });
});

// Register for userModel2
router.post('/register2', function(req, res, next) {
  const data2 = new userModel2({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    name: req.body.fullname
  });

  userModel2.register(data2, req.body.password, function(err, registeredUser) {
    if (err) {
      console.error(err);
      res.redirect('/registration-error');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/profile');
      });
    }
  });
});

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
router.get('/signinpage', (req, res) => {
  res.render('signinpage',{nav:false}); 
});

router.get('/registerpage', (req, res) => {
  res.render('registerpage',{nav:false}); 
});
router.get('/register', function(req, res, next) {
  res.render("regiter",{nav:false});
});
module.exports = router;


