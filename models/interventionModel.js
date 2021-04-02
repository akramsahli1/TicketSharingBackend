const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const interventionSchema = mongoose.Schema({
    
    IDclient : {
        type: String
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
        type: String,
    },
    IDintervenant : {
        type: String,
        default:""
    },
    periodeTrai : {
        type : Number,
        default : 1
    },
    etat : {
        type : String,
        default:"En attente"
    },
    dateDebut : {
        type: String,
        default:""
    },
    heureDebut : {
        type: String,
        default:""
    },
    dateFin : {
        type: String,
        default:""
    },
    heureFin : {
        type: String,
        default:""
    },
    detailintervention : {
        type: String,
        default:""
    },
    rapportIntervention : {
        type: String,
        default:""
    },
});





const Intervention = mongoose.model("Intervention", interventionSchema);
module.exports = Intervention;




    
