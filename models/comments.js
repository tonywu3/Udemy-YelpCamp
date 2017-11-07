var mongoose = require("mongoose");

// compile schema using mongoose
var commentSchema = mongoose.Schema({
   text: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user"
      },
      username: String
   },
});

// exporting the model Schema
module.exports = mongoose.model("Comment", commentSchema);