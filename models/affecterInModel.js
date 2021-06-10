const mongoose = require("mongoose");

const affecterInSchema = mongoose.Schema({
    
    IDTicket : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interv"
    },
   
    IDintervenant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MembSociete"
    },
    dateAffectation : {
        type: Date
    },
    annule : {
        type: Boolean,
        default : false
    }
    
});





const AffecterIn = mongoose.model("AffecterIn", affecterInSchema);
module.exports = AffecterIn;




    
