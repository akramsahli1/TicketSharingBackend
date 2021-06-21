const Ticket = require("../models/ticketModel");
const Rapport = require("../models/rapportInterModel");
const Affecter = require("../models/affecterModel");

createRef= async(req, res, next) => {
    const year=new Date(req.body.dateCreation).getFullYear()
    var ref ;

  const tickets = await Ticket.find({dateCreation: {$gte: new Date(year, 0, 1), $lt: new Date(year+1, 0,1)}}).sort([['dateCreation','desc']])
  if (tickets.length>0){
    ref=parseInt(tickets[0].ref.substr(8))+1
  }else ref=0;
  
  req.ref='Ti-'+year+'-'+ref;
 
   next();
 
};

deleteTicket= async(req, res, next) => {
 const res1=await Affecter.remove({IDTicket:req.params.ticketId})
 const res2= await Rapport.remove({IDTicket:req.params.ticketId})


 next()

};

deleteTicketCl= async(req, res, next) => {
  const tickets = await Ticket.find({IDclient:req.params.clientId})
  const idsTickes=tickets.map((tic)=>(tic._id))
  const res1=await Affecter.remove({IDTicket:idsTickes})
  const res2= await Rapport.remove({IDTicket:idsTickes})
  const res3=await Ticket.remove({_id:idsTickes})
  next()
 
 };
 deleteTicketIn= async(req, res, next) => {
  const res1=await Affecter.remove({IDintervenant:req.params.membSocieteId})
  const res2= await Rapport.remove({IDintervenant:idsTickes})
  next()
 
 };
module.exports = {
  createRef,
  deleteTicket,
  deleteTicketCl,
  deleteTicketIn
};