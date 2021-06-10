const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    user: {
        type: String
    },
    text : {
        type: String
    },
    date : {
        type: Date
    },
    
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;




    
