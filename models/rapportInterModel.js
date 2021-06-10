const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const rapportInterSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    IDintervenant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MembSociete"
    },
    dateCreation : {
        type: Date
    },
    dateDebut : {
        type: Date
    },
    dateFin : {
        type: Date
    },
    detailinter : {
        type: String
    },
    attachement : {
        type: Buffer
    },
    nomAttachement : {
        type: String
    }
});


 


const RapportInter = mongoose.model("RapportInter", rapportInterSchema);
module.exports = RapportInter;
