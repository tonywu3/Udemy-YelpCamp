
var express = require("express"),
    Campground = require("../models/campground"),
    Comment = require("../models/comments"),
    middleware = require("../middleware");
    
var router = express.Router({mergeParams:true});

// ==============
//    COMMENT ROUTES
// ==============

router.get("/new", middleware.isLoggedIn, function(req,res){
    console.log(req);
    // find campground with providedID
    Campground.findById(req.params.id,function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            console.log(foundCamp);
            res.render("comments/new", {campground: foundCamp});
            // res.send("new route");
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res ){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
              if(err){
                  req.flash("error","An error occured trying to create your comment. Please try again!");
                  console.log(err);
              } else {
                  console.log(comment);
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  
                  campground.comments.push(comment);
                  campground.save();
                  req.flash("success","Campground created!");
                  res.redirect("/campgrounds/" + campground._id);
              }
           });
       }
    });
});

router.get("/:comment_id/edit", middleware.commentAuthorization, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
    //res.send("comment edit route");
});

//Update route
router.put("/:comment_id", middleware.commentAuthorization, function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if (err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

//Delete route
router.delete("/:comment_id", middleware.commentAuthorization, function(req, res){
    //findbyidandremove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }
        req.flash("success", "Comment deleted");
        res.redirect("/campgrounds/" + req.params.id);
    });
    //res.send("comment del route");
});

module.exports  = router;