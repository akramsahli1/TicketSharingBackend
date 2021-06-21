const Affecter = require("../models/affecterModel");
const Ticket = require("../models/ticketModel");


filtreIntervenant= async(req, res, next) => {
  if(req.body.filters.IDintervenant!==undefined&&req.body.filters.IDintervenant!==''){
  const affectations = await Affecter.find({IDintervenant:req.body.filters.IDintervenant,annule:false})
  const idsTickes=affectations.map((aff)=>(aff.IDTicket))
  req.ticket=idsTickes;
  }
   next();
 
};

filtreClient= async(req, res, next) => {
  if(req.body.filters.IDclient!==undefined&&req.body.filters.IDclient!==''){
  const tickets = await Ticket.find({IDclient:req.body.filters.IDclient})
  const idsTickes=tickets.map((tic)=>(tic._id))
  req.ticket=idsTickes;
  }
   next();
};
module.exports = {
  filtreIntervenant,
  filtreClient
};