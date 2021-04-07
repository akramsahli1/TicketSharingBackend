const Contrat = require("../models/contratModel");

const getAllContrats = async (req, res) => {
  try{
    const contrats = await Contrat.find();
    res.status(200).json({
    success: "True",
    data : contrats
    }); 
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
        
      })
  }
};

const createContrat = async (req, res) => {
  const newContrat = new Contrat(req.body);
  try{
    const contrat = await newContrat.save();
    res.status(201).json({
      success: "true",
      data : contrat
    });
  } catch(err) {
    res.status(404).json({
      success: "false",
      msg:err
    });
  } 
};


const getContrat = async (req, res) => {
  try{
    const contrat = await Contrat.findById(req.params.contratId, req.body);
    res.status(200).json({
    success: "True",
    data : contrat
    }); 
  } catch(err){
    err => console.log(err);
  }
};
const getContratsClient = async (req, res) => {
    try{
      const contrats = await Contrat.find({IDclient:req.params.IDclient});
      res.status(200).json({
        success: "True",
        data: contrats
      }); 
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
};

const updateContrat =async(req, res) => {
  try{
    const contrat = await Contrat.findByIdAndUpdate(req.params.contratId, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    success: "PATCH Contrat route has been executed",
    data : contrat
    });
  } catch(err){      
    err => console.log(err);
  }
};

const deleteContrat = async (req, res) => {
  try{
    const contrat = await Contrat.findByIdAndDelete(req.params.contratId);
    console.log(contrat,"Deleted");
    res.status(200).json({
    success: "True",
    data : contrat
    }); 
  } catch(err){
    err => console.log(err);
  }
};

module.exports = {
  getAllContrats,
  createContrat,
  getContrat,
  getContratsClient,
  updateContrat,
  deleteContrat
};
