const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const affecterSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    IDintervenant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MembSociete"
    },
    dateAffectation : {
        type: Date
    },
    dureeTraitement : {
        type: Number
    },
    annule : {
        type: Boolean,
        default : false
    }
});

 



const Affecter = mongoose.model("Affecter", affecterSchema);
module.exports = Affecter;
