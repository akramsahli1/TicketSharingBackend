const Intervention = require("../models/interventionModel");

const getAllInterventions = async (req, res) => {
    try{
      const interventions = await Intervention.find();
      res.status(200).json({
      success: "True",
      data : interventions
      }); 
    } catch(err){
          res.status(404).json({
            success: "false",
          msg:err
          
        })
    }
  };
  
  const createIntervention = async (req, res) => {
    const newIntervention = new Intervention(req.body);
    try{
      const intervention = await newIntervention.save();
      
      res.status(201).json({
        success: "true",
        data : intervention
      });
    } catch(err) {
      res.status(404).json({
        success: "false",
      msg:err
      });
    } 
  };
  
  const getIntervention = async (req, res) => {
    try{
      const intervention = await Intervention.findById(req.params.interventionId, req.body);
      res.status(200).json({
      success: "True",
      data : intervention
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
  const updateIntervention =async(req, res) => {
    try{
      const intervention = await Intervention.findByIdAndUpdate(req.params.interventionId, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
      success: "PATCH intervention route has been executed",
      data : intervention
      }); 
    } catch(err){      
      err => console.log(err);
    }
  };

  const deleteIntervention = async (req, res) => {
    try{
      const intervention = await Intervention.findByIdAndDelete(req.params.interventionId);
      console.log(intervention,"Deleted");
      res.status(200).json({
      success: "True",
      data : intervention
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  const getInterventionsClient = async (req, res) => {
    try{
      const interventions = await Intervention.find({IDclient:req.params.IDclient});
      console.log(req.params.IDclient);
      res.status(200).json({
        success: "True",
        data: interventions
      }); 
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
  };
  
  const getInterventionsIntervenant = async (req, res) => {
    try{
      const interventions = await Intervention.find({IDintervenant:req.params.IDintervenant});
      res.status(200).json({
        success: "True",
        data: interventions
      }); 
    } catch(err){
        res.status(404).json({
          success: "false",
          msg:err
        })
    }
  };

  module.exports = {
    getAllInterventions,
    createIntervention,
    getIntervention,
    updateIntervention,
    deleteIntervention,
    getInterventionsClient,
    getInterventionsIntervenant,
  };