var express = require("express");
var router = express.Router();
var middleware= require("../middleware");

var Campground = require("../models/campground");

//INDEX
router.get("/campgrounds", function(req, res){
    // get all CG from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){ 
            console.log(err); 
        } else {
            //passes in data as object {objectname: variable name}
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
    //get data from form and add to array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamp = { name:name, price: price, image:image, description: desc, author: author};
    // campgrounds.push(newCamp);
    
    // Create and save
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newCamp.desc);
            res.redirect("/campgrounds");
        }
    })
});

//NEW
router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
    //create form
    res.render("campgrounds/new");
});

//SHOW
router.get("/campgrounds/:id", function(req,res){
    // find campground with providedID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            //console.log(foundCamp);
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

//EDIT
router.get("/campgrounds/:id/edit", middleware.campgroundAuthorization, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render("campgrounds/edit", {campground: foundCamp});
    });
});

//UPDATE
router.put("/campgrounds/:id", middleware.campgroundAuthorization, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp){
        res.redirect("/campgrounds/" + req.params.id);
    });
    // res.send("Put route");
});

//Destroy
router.delete("/campgrounds/:id/", middleware.campgroundAuthorization, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        res.redirect("/campgrounds");
    });
});



module.exports = router;