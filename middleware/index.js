var middlewareObj = {}
var Campground = require("../models/campground");
var Comment = require("../models/comments");

middlewareObj.campgroundAuthorization = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //Mongoose method to compare id object to id string
                if(foundCamp.author.id.equals(req.user._id)){
                  //res.render("campgrounds/edit", {campground: foundCamp});  
                  next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "How did you even get here? You need to be logged in to edit!");
        res.redirect("back");
    }
}   

middlewareObj.commentAuthorization = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //Mongoose method to compare id object to id string
                if(foundComment.author.id.equals(req.user._id)){
                  //res.render("campgrounds/edit", {campground: foundCamp});  
                  next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You don't have permission to do that.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;