const MembSociete = require("../models/membSocieteModel");

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


module.exports = {
  getAllMembSocietes,
  createMembSociete,
  getMembSociete,
};
