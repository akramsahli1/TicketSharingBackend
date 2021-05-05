const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const rapportInterSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    IDintervenant : {
        type: String
    },
    dateCreation : {
        type: String
    },
    heureCreation : {
        type: String
    },
    dateDebut : {
        type: String
    },
    heureDebut : {
        type: String
    },
    dateFin : {
        type: String
    },
    heureFin : {
        type: String
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
