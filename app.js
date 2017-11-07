var express     = require("express"),
    app         = express(),
    parser      = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comments"),
    seedDb      = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    flash = require("connect-flash"),
    method = require("method-override");
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/auth");
    
//seedDb();

// Hook up mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.Promise = global.Promise;

// Tells express to use bodyParser (parser)
app.use(parser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
app.use(method("_method"));
app.use(flash());

// Makes API calls
var request = require("request");

// Allows render parameter to omit ".ejs"
app.set("view engine", "ejs");


//PASSPORT
app.use(require("express-session")({
   secret: "This is the seed sentence for YelpCamp",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);
app.use(campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started successfully.");
});