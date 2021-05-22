const Client = require("../models/clientModel");
const bcrypt = require("bcrypt");
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

const getClientConnecte = async (req, res) => {
  try{
    const client = await Client.findById(req.user.id, req.body);
    res.status(200).json({
    success: "True",
    data : client
    }); 
  } catch(err){
    err => console.log(err);
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

const updateClient =async(req, res) => {
  try{
    const client = await Client.findByIdAndUpdate(req.params.clientId, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    success: "PATCH Client route has been executed",
    data : client
    });
  } catch(err){      
    err => console.log(err);
  }
};

const updateMotDePasseClient =async(req, res) => {
  const updateClient = req.body;
  try{
    const salt = await bcrypt.genSalt();
    updateClient.motDePasse = await bcrypt.hash(updateClient.motDePasse, salt);
    const client = await Client.findByIdAndUpdate(req.params.clientId, updateClient, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    success: "PATCH client route has been executed",
    data : client
    });
  } catch(err){      
    err => console.log(err);
  }
};

const deleteClient = async (req, res) => {
  try{
    const client = await Client.findByIdAndDelete(req.params.clientId);
    console.log(client,"Deleted");
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
  updateClient,
  deleteClient,
  updateMotDePasseClient,
  getClientConnecte
};
