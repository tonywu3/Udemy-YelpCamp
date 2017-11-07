var express = require("express"),
    passport = require("passport"),
    User = require("../models/user");

var router = express.Router();

router.get("/", function(req, res){
   res.render("landing");
});

// ==================
//          AUTH_ROUTES
// ==================

router.get("/register", function(req,res){
    res.render("register");
});

router.post("/register", function(req,res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
          req.flash("error", err.message);
           console.log(err);
           //ends callback function by returning
           return res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
          req.flash("success","Account created! Welcome to YelpCamp, " + user.username + "!");
          res.redirect("/campgrounds"); 
       });
   });
});

//LOGIN
router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failure: "/login"
    }), function(req,res){
    
});

//LOGOUT
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/");
});

module.exports = router;