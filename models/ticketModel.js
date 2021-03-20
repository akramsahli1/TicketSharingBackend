const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ticketSchema = mongoose.Schema({
    
    client : {
        type: String
    },
    date : {
        type: String
    },
    heure : {
        type: String
    },
    contrat : {
        type: String
    },
    nature : {
        type: String,
    },
    priorité : {
        type: String,
        default:"Normal"
    },
    objet : {
        type: String,
    },
    details : {
        type: String,
    },

});





const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;




    
