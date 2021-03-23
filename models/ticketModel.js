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
    priorite : {
        type: String,
        default:"Normal"
    },
    objet : {
        type: String,
    },
    details : {
        type: String,
    },
    intervenant : {
        type: String,
        default:""
    },
    periode : {
        type : Number,
        default : 1
    },
    status : {
        type : String,
        default:"En attente"
    },

});





const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;




    
