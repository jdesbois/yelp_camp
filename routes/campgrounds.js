var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//campgrounds list page
router.get("/", function(req,res){
    //get all campground from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});
//CREATE ROUTE - creating new campground
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    
    //create a new campground and save to DB
    Campground.create(newCampground, function(err, newCampground){
        if(err) {
            console.log(err);
        } else {
            //redirect to campgrounds page
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    })
})
//NEW ROUTE - route to new campground form
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
})
//SHOW ROUTE
router.get("/:id", function(req,res){
    //find campground with speicific ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err) {
           console.log(err);
       } else {
        //show rendered page with information
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
})

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    })
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Deleted Successfully!");
            res.redirect("/campgrounds");
        }
    })
})


//CHECK OWNERSHIP


//LOGGED IN MIDDLEWARE


module.exports = router;