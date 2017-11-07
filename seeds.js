var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment     = require("./models/comments");
    
var seedData = [
        {name:"West Lake", image:"https://static.pexels.com/photos/129441/pexels-photo-129441.jpeg", description:"Debet patrioque mea in, ridens quidam vocent sed ut. Quo ea ignota prodesset definitiones. Omnes quaeque intellegat qui ad. Ad malis mucius maiorum est, has at quis labore mediocrem, vis ut tota exerci semper. Quo liber omnium te. In ipsum deserunt ius, pro vide apeirian te, erant dolor ne quo."},
        {name:"Canon", image:"https://static.pexels.com/photos/230629/pexels-photo-230629.jpeg", description:"Debet patrioque mea in, ridens quidam vocent sed ut. Quo ea ignota prodesset definitiones. Omnes quaeque intellegat qui ad. Ad malis mucius maiorum est, has at quis labore mediocrem, vis ut tota exerci semper. Quo liber omnium te. In ipsum deserunt ius, pro vide apeirian te, erant dolor ne quo."},
        {name:"Zen Stones", image:"https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg", description:"Debet patrioque mea in, ridens quidam vocent sed ut. Quo ea ignota prodesset definitiones. Omnes quaeque intellegat qui ad. Ad malis mucius maiorum est, has at quis labore mediocrem, vis ut tota exerci semper. Quo liber omnium te. In ipsum deserunt ius, pro vide apeirian te, erant dolor ne quo."}
    ];    
    
    
function seedDB(){
    //remove all grounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("wiped db")
            Comment.remove({}, function(err){
                if(err){
                  console.log(err);
              } else {
                  console.log("Wiped comments db");
              }
            }); 
            //add campgrounds
            seedData.forEach(function(camp){
              Campground.create(camp, function(err, campground){
                  if(err){
                      console.log(err);
                  } else {
                      console.log("added campground");
                      //create comment using Comment schema
                      Comment.create({
                          text:"This is a great place.",
                          author: "Elie Wiesel"
                      }, function(err, comment){
                          if(err){
                              console.log(err);
                          } else {
                              campground.comments.push(comment);
                              campground.save();
                              console.log("created new comment");
                          }
                      });
                  }
              });
            });
        };

    });
}

// exporting the function
module.exports = seedDB;