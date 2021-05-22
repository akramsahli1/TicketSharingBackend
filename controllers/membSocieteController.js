const MembSociete = require("../models/membSocieteModel");
const bcrypt = require("bcrypt");
const getAllMembSocietes = async (req, res) => {
  try{
    const membSocietes = await MembSociete.find();
    res.status(200).json({
    success: "True",
    data : membSocietes
    }); 
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
        
      })
  }
};

const createMembSociete = async (req, res) => {
  const newMembSociete = new MembSociete(req.body);
  try{
    const membSociete = await newMembSociete.save();
    res.status(201).json({
      success: "true",
      data : membSociete
    });
  } catch(err) {
    res.status(404).json({
      success: "false",
      msg:err
    });
  } 
};


const getMembSociete = async (req, res) => {
  try{
    const membSociete = await MembSociete.findById(req.params.membSocieteId, req.body);
    res.status(200).json({
    success: "True",
    data : membSociete
    }); 
  } catch(err){
    err => console.log(err);
  }
};

const getMembSocieteConnecte = async (req, res) => {
  try{
    const membSociete = await MembSociete.findById(req.user.id, req.body);
    res.status(200).json({
    success: "True",
    data : membSociete
    }); 
  } catch(err){
    err => console.log(err);
  }
};

const getMembSocieteRole = async (req, res) => {
  try{
    const membSocietes = await MembSociete.find({role:req.params.role});
    res.status(200).json({
      success: "True",
      data: membSocietes
    }); 
  } catch(err){
      res.status(404).json({
        success: "false",
        msg:err
      })
  }
};

const updateMembSociete =async(req, res) => {
  try{
    const membSociete = await MembSociete.findByIdAndUpdate(req.params.membSocieteId, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    success: "PATCH Client route has been executed",
    data : membSociete
    });
  } catch(err){      
    err => console.log(err);
  }
};

const updateMotDePasseMembSociete =async(req, res) => {
  const updateMembSociete = req.body;
  try{
    console.log(updateMembSociete);
    const salt = await bcrypt.genSalt();
    updateMembSociete.motDePasse = await bcrypt.hash(updateMembSociete.motDePasse, salt);
    console.log(updateMembSociete.motDePasse);
    const membSociete = await MembSociete.findByIdAndUpdate(req.params.membSocieteId, updateMembSociete, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    success: "PATCH MembSociete route has been executed",
    data : membSociete
    });
  } catch(err){      
    err => console.log(err);
  }
};

const deleteMembSociete = async (req, res) => {
  try{
    const membSociete = await MembSociete.findByIdAndDelete(req.params.membSocieteId);
    console.log(membSociete,"Deleted");
    res.status(200).json({
    success: "True",
    data : membSociete
    }); 
  } catch(err){
    err => console.log(err);
  }
};

module.exports = {
  getAllMembSocietes,
  createMembSociete,
  getMembSociete,
  getMembSocieteRole,
  updateMembSociete,
  deleteMembSociete,
  updateMotDePasseMembSociete,
  getMembSocieteConnecte
};
