const Ticket = require("../models/ticketModel");
const fileupload = require('express-fileupload')
const express = require("express");
const app = express();
app.use(fileupload())

const getAllTickets = async (req, res) => {
  try{
  let findArgs = {};
  
  for (let key in req.body.filters) {

      if (req.body.filters[key].length > 0) {
              findArgs[key] = req.body.filters[key];
      }
  }
    
    console.log(findArgs)
    const tickets = await Ticket.find(findArgs);
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
  const newTicket = new Ticket(req.body);
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
      const ticket = await Ticket.findById(req.params.ticketId, req.body);
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
      const tickets = await Ticket.find({IDclient:req.params.IDclient});
      console.log(req.params.IDclient);
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
      const tickets = await Ticket.find({contrat:req.params.contrat});
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