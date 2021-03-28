const Client = require("../models/ClientModel");

const getAllClients = async (req, res) => {
  try{
    const clients = await Client.find();
    res.status(200).json({
    success: "True",
    data : clients
    }); 
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
        
      })
  }
};

const createClient = async (req, res) => {
  const newClient = new Client(req.body);
  try{
    const client = await newClient.save();
    res.status(201).json({
      success: "true",
      data : client
    });
  } catch(err) {
    res.status(404).json({
      success: "false",
      msg:err
    });
  } 
};


const getClient = async (req, res) => {
  try{
    const client = await Client.findById(req.params.clientId, req.body);
    res.status(200).json({
    success: "True",
    data : client
    }); 
  } catch(err){
    err => console.log(err);
  }
};


module.exports = {
  getAllClients,
  createClient,
  getClient,
};