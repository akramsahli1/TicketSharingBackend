const mongoose = require("mongoose");


const feedBackSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    rate : {
        type: Number,
    },
    commentaire : {
        type: String
    }
});

 



const FeedBack = mongoose.model("FeedBack", feedBackSchema);
module.exports = FeedBack;
