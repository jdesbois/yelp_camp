var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Cloud's Rest", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, eros quis scelerisque scelerisque, risus felis rhoncus risus, nec dictum sapien massa molestie velit. Curabitur ac luctus lectus, vitae viverra neque. Phasellus a dolor sagittis, congue tellus non, maximus erat. Praesent vel neque sit amet elit iaculis dictum et eget felis. Donec condimentum dui nulla, nec aliquet lorem sagittis vel. Mauris nec est vel magna consectetur blandit. Maecenas sed pulvinar arcu, nec placerat arcu. Aliquam dui lectus, consequat et malesuada sit amet, commodo non purus."},
    {name: "Indy's Place", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, eros quis scelerisque scelerisque, risus felis rhoncus risus, nec dictum sapien massa molestie velit. Curabitur ac luctus lectus, vitae viverra neque. Phasellus a dolor sagittis, congue tellus non, maximus erat. Praesent vel neque sit amet elit iaculis dictum et eget felis. Donec condimentum dui nulla, nec aliquet lorem sagittis vel. Mauris nec est vel magna consectetur blandit. Maecenas sed pulvinar arcu, nec placerat arcu. Aliquam dui lectus, consequat et malesuada sit amet, commodo non purus."},
    {name: "Dory's Place", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, eros quis scelerisque scelerisque, risus felis rhoncus risus, nec dictum sapien massa molestie velit. Curabitur ac luctus lectus, vitae viverra neque. Phasellus a dolor sagittis, congue tellus non, maximus erat. Praesent vel neque sit amet elit iaculis dictum et eget felis. Donec condimentum dui nulla, nec aliquet lorem sagittis vel. Mauris nec est vel magna consectetur blandit. Maecenas sed pulvinar arcu, nec placerat arcu. Aliquam dui lectus, consequat et malesuada sit amet, commodo non purus."},
    {name: "Peanut's Place", image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg",  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, eros quis scelerisque scelerisque, risus felis rhoncus risus, nec dictum sapien massa molestie velit. Curabitur ac luctus lectus, vitae viverra neque. Phasellus a dolor sagittis, congue tellus non, maximus erat. Praesent vel neque sit amet elit iaculis dictum et eget felis. Donec condimentum dui nulla, nec aliquet lorem sagittis vel. Mauris nec est vel magna consectetur blandit. Maecenas sed pulvinar arcu, nec placerat arcu. Aliquam dui lectus, consequat et malesuada sit amet, commodo non purus."},
    {name: "Arse end of nowhere", image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, eros quis scelerisque scelerisque, risus felis rhoncus risus, nec dictum sapien massa molestie velit. Curabitur ac luctus lectus, vitae viverra neque. Phasellus a dolor sagittis, congue tellus non, maximus erat. Praesent vel neque sit amet elit iaculis dictum et eget felis. Donec condimentum dui nulla, nec aliquet lorem sagittis vel. Mauris nec est vel magna consectetur blandit. Maecenas sed pulvinar arcu, nec placerat arcu. Aliquam dui lectus, consequat et malesuada sit amet, commodo non purus."},
    ];
    
function seedDB(){
//REMOVE ALL CAMPGROUNDS
Comment.remove({});
Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed Campgrounds!");
        //ADD CAMPGROUNDS
            data.forEach(function(seed){
                
              Campground.create(seed, function(err, campground){
                   
                  if (err) {
                      console.log(err);
                  } else {
                      console.log("Added Campground");
                      //Create a comment on each campground
                      Comment.create(
                          {
                              text: "This place is great but I wish there was internet!",
                              author: "Homer",
                            }, function(err, comment){
                                  if (err) {
                                      console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save();
                                      console.log("created comment");
                                  }
                      });
                  }
                }); 
             });
         }
    });
}

module.exports = seedDB;