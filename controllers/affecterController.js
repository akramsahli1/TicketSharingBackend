const Affecter = require("../models/affecterModel");

const getAllAffectations = async (req, res) => {
  try{
    const affectations = await Affecter.find()
    .populate("IDTicket")
    .then(function(aff) {
      res.status(200).json({
        success: "True",
        data : aff
        });
    });
     
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
        
      })
  }
};

const createAffectation = async (req, res) => {
  const newAffectation = new Affecter(req.body);
  try{
    const affectation = await newAffectation.save();
    res.status(201).json({
      success: "true",
      data : affectation
    });
  } catch(err) {
    res.status(404).json({
      success: "false",
      msg:err
    });
  } 
};

const getAffectation = async (req, res) => {
    try{
      const affectation = await Affecter.findById(req.params.affectationId, req.body);
      res.status(200).json({
      success: "True",
      data : affectation
      }); 
    } catch(err){
      err => console.log(err);
    }
};
  
const getAffectationsTicket = async (req, res) => {
    try{
      const affectations = await Affecter.find({IDTicket:req.params.IDTicket,annule:false});
      res.status(200).json({
        success: "True",
        data: affectations
      }); 
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
};

const getAffectationsIntervenant = async (req, res) => {
    try{
      const affectations = await Affecter.find({IDintervenant:req.params.IDintervenant,annule:false})
      .populate("IDTicket")
      .then(function(aff) {
      res.status(200).json({
        success: "True",
        data : aff
        });
      });
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
};

const getAffectationsIntervenantTicket = async (req, res) => {
  try{
    const affectations = await Affecter.find({IDTicket:req.params.IDTicket,IDintervenant:req.params.IDintervenant});
    res.status(200).json({
      success: "True",
      data: affectations
    }); 
  } catch(err){
      res.status(404).json({
        success: "false",
        msg:err
      })
  }
};

const updateAffectation =async(req, res) => {
  try{
    const affectation = await Affecter.findByIdAndUpdate(req.params.affectationId, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    success: "PATCH affectation route has been executed",
    data : affectation
    });
  } catch(err){      
    err => console.log(err);
  }
};

const deleteAffectation = async (req, res) => {
  try{
    const affectation = await Affecter.findByIdAndDelete(req.params.affectationId);
    console.log(affectation,"Deleted");
    res.status(200).json({
    success: "True",
    data : affectation
    }); 
  } catch(err){
    err => console.log(err);
  }
};

module.exports = {
  getAllAffectations,
  createAffectation,
  getAffectation,
  getAffectationsTicket,
  getAffectationsIntervenant,
  getAffectationsIntervenantTicket,
  updateAffectation,
  deleteAffectation
};
