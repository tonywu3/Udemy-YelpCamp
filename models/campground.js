var mongoose = require("mongoose");


// Set up db schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// compile schema
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports= mongoose.model("Campground",campgroundSchema);