const mongoose = require("mongoose");

const intervSchema = mongoose.Schema({
    
    IDclient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    dateCreation : {
        type: Date
    },
    heureCreation : {
        type: String
    },
    dateCloture : {
        type: Date,
        default:Date.now()
    },
    priorite : {
        type: String,
        default:"Normal"
    },
    etat : {
        type : String,
        default:"En attente"
    }
});





const Interv = mongoose.model("Interv", intervSchema);
module.exports = Interv;




    
