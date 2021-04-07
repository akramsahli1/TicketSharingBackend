const mongoose = require("mongoose");

const contratSchema = mongoose.Schema({
    
    IDclient : {
        type: String
    },
    type : {
        type: String
    },
    visitesMainPreventive : {
        type : Number
    },
    visitesMainCurative : {
        type : Number
    },
    prixInterSupp : {
        type : Number
    },
    contact : {
        type: String
    },
    telContact : {
        type: String
    },
    emailContact : {
        type: String
    }
});

const Contrat = mongoose.model("Contrat", contratSchema);
module.exports = Contrat;




    
