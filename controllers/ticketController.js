const Ticket = require("../models/ticketModel");

const getAllTickets = async (req, res) => {
    try{
      const tickets = await Ticket.find();
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
  
  const createTicket = async (req, res) => {
    const newTicket = new Ticket(req.body);
    try{
      const ticket = await newTicket.save();
      
      res.status(201).json({
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
      const tickets = await Ticket.find({client:req.params.client});
      console.log(req.params.client);
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
  
  const getTicketsIntervenant = async (req, res) => {
    try{
      const tickets = await Ticket.find({intervenant:req.params.intervenant});
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
    getTicketsIntervenant,
  };