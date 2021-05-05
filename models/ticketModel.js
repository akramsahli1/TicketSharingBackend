const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ticketSchema = mongoose.Schema({
    
    IDclient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    dateCreation : {
        type: String
    },
    heureCreation : {
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
    image : {
        type: Buffer
    },
    etat : {
        type : String,
        default:"En attente"
    }
});





const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;




    
