const Affecter = require("../models/affecterModel");

module.exports= async(req, res, next) => {
  if(req.body.IDintervenant!==undefined&&req.body.IDintervenant!==''){
  const affectations = await Affecter.find({IDintervenant:req.body.IDintervenant,annule:false})
  const idsTickes=affectations.map((aff)=>(aff.IDTicket))
  req.ticket=idsTickes;
  }
   next();
 
};