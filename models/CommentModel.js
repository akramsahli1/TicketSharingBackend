const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    
    room : {
        type: String
    },
    user: {
        type: String
    },
    text : {
        type: String
    },
    date : {
        type: String
    },
    
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;




    
