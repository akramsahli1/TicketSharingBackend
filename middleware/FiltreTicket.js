const Affecter = require("../models/affecterModel");

module.exports= async(req, res, next) => {
  if(req.body.filters.IDintervenant!==undefined&&req.body.filters.IDintervenant!==''){
  const affectations = await Affecter.find({IDintervenant:req.body.filters.IDintervenant,annule:false})
  const idsTickes=affectations.map((aff)=>(aff.IDTicket))
  req.ticket=idsTickes;
  }
   next();
 
};