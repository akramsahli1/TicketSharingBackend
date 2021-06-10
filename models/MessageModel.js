const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Ticket"
    },
    user: {
        type: String
    },
    contenu : {
        type: String
    },
    date : {
        type: Date
    },
    type:{
        type:String
    }
    
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;