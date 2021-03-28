const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const rapportInterSchema = mongoose.Schema({
    idTicket : {
        type: String
    },
    nomIntervenant : {
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
    }
});





const RapportInter = mongoose.model("RapportInter", rapportInterSchema);
module.exports = RapportInter;