const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const affecterSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    IDMembSociete : {
        type: String
    },
    IDintervenant : {
        type: String
    },
    dateAffectation : {
        type: String
    },
    heureAffectation : {
        type: String
    },
    dureeTraitement : {
        type: String
    },
    annule : {
        type: Boolean,
        default : false
    }
});





const Affecter = mongoose.model("Affecter", affecterSchema);
module.exports = Affecter;
