const Ticket = require("../models/ticketModel");
const fileupload = require('express-fileupload')
const express = require("express");
const app = express();
app.use(fileupload())

const getAllTickets = async (req, res) => {
  try{
  let findArgs = {};

  for (let key in req.body.filters) {
       if(key==='IDintervenant'){
          if(req.ticket!==undefined){findArgs['_id'] = req.ticket;}
       }
       else {
        if (req.body.filters[key].length > 0){ 
          if(key==='dateCreation') {
              const date= new Date(req.body.filters[key])
               findArgs[key] =  {$gte:date, $lt: new Date(date.getFullYear(),date.getMonth(),(date.getDate() +1))};
            }else{
              findArgs[key] = req.body.filters[key];
            }
          }
        }  
  }
  let ref = req.body.searchRef;
    console.log(findArgs)
    let tickets;
    if (ref)
       tickets = await Ticket.find(findArgs)
      .find({ $text: { $search: ref } })
      .populate('IDclient').sort([['dateCreation','desc']])
    else
       tickets = await Ticket.find(findArgs).populate('IDclient').sort([['dateCreation','desc']])
      res.status(200).json({
        success: "True",
        data : tickets
        }); 

  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
      })
  }
};
const getImage = async(req, res) => {
  try{
  const ticket = await Ticket.findById(req.params.ticketId, req.body);
   res.set('Content-Type','image/jpg')
   res.send(ticket.image)
 } catch(err) {
   res.status(404).json({
     success: "false",
   msg:err
   });
 } 
}

const createTicket = async (req, res) => {
  const newTicket = new Ticket({...req.body,ref:req.ref});
  try{
    if(req.files !== null){
      newTicket.image = new Buffer.from(req.files.image.data, 'base64');
    }
    const ticket = await newTicket.save();
   res.status(200).json({
     success: "true",
     data : ticket
   });
  } catch(err) {
   res.status(404).json({
     success: "false",
   msg:err
   });
  } 
};
  
  const getTicket = async (req, res) => {
    try{
      const ticket = await Ticket.findById(req.params.ticketId, req.body).populate('IDclient');
      res.status(200).json({
        success: "True",
        data : ticket
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
  const updateTicket =async(req, res) => {
    try{
      const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
      success: "PATCH ticket route has been executed",
      data : ticket
      }); 
    } catch(err){      
      err => console.log(err);
    }
  };

  const deleteTicket = async (req, res) => {
    try{
      const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);
      console.log(ticket,"Deleted");
      res.status(200).json({
      success: "True",
      data : ticket
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  const getTicketsClient = async (req, res) => {
    try{
      const tickets = await Ticket.find({IDclient:req.params.IDclient}).populate("Client");
      res.status(200).json({
        success: "True",
        data: tickets
      }); 
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
  };

  const getTicketsContrat = async (req, res) => {
    try{
      const tickets = await Ticket.find({contrat:req.params.contrat}).populate('IDclient');
      res.status(200).json({
        success: "True",
        data: tickets
      }); 
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
  };

  module.exports = {
    getAllTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket,
    getTicketsClient,
    getTicketsContrat,
    getImage
  };