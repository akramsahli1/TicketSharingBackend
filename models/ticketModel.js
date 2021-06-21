const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    
    IDclient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    dateCreation : {
        type: Date,
    },
    ref:{
        type:String
    },
    contrat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contrat"
    },
    nature : {
        type: String,
    },
    priorite : {
        type: String,
        default:"Normale"
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

ticketSchema.index({ 
    ref: 'text'
}
)



const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;




    
