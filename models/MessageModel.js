const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    
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

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;