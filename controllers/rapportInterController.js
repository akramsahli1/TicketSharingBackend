const RapportInter = require("../models/rapportInterModel");

const getAllRapportInters = async (req, res) => {
    try{
      const rapportInters = await RapportInter.find();
      res.status(200).json({
      success: "True",
      data : rapportInters
      }); 
    } catch(err){
          res.status(404).json({
            success: "false",
          msg:err
          
        })
    }
  };
  
  const createRapportInter = async (req, res) => {
    const newRapportInter = new RapportInter(req.body);
    try{
      const rapportInter = await newRapportInter.save();
      
      res.status(201).json({
        success: "true",
        data : rapportInter
      });
    } catch(err) {
      res.status(404).json({
        success: "false",
      msg:err
      });
    } 
  };
  
  const getRapportInter = async (req, res) => {
    try{
      const rapportInter = await RapportInter.findById(req.params.rapportInterId, req.body);
      res.status(200).json({
      success: "True",
      data : rapportInter
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
  const updateRapportInter =async(req, res) => {
    try{
      const rapportInter = await RapportInter.findByIdAndUpdate(req.params.rapportInterId, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
      success: "PATCH rapport d'intervention route has been executed",
      data : rapportInter
      }); 
    } catch(err){      
      err => console.log(err);
    }
  };

  const deleteRapportInter = async (req, res) => {
    try{
      const rapportInter = await RapportInter.findByIdAndDelete(req.params.rapportInterId);
      console.log(rapportInter,"Deleted");
      res.status(200).json({
      success: "True",
      data : rapportInter
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
  const getRapportIntersIntervenant = async (req, res) => {
    try{
      const rapportInters = await RapportInter.find({nomIntervenant:req.params.intervenant});
      res.status(200).json({
        success: "True",
        data: rapportInters
      }); 
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
  };

  module.exports = {
    getAllRapportInters,
    createRapportInter,
    getRapportInter,
    updateRapportInter,
    deleteRapportInter,
    getRapportIntersIntervenant,
  };