const RapportInter = require("../models/rapportInterModel");
const fileupload = require('express-fileupload')
const express = require("express");
const app = express();
app.use(fileupload())

const getAllRapportInters = async (req, res) => {
  try{
  let findArgs = {};

  for (let key in req.body.filters) {
    
    if(key==='IDclient'){
      if(req.ticket!==undefined){findArgs['IDTicket'] = req.ticket;}
   }
   else {
    if (req.body.filters[key].length > 0){ 
      if(key==='dateCreation') {
          const date= new Date(req.body.filters[key])
           findArgs[key] =  {$gte:date, $lt: new Date(date.getFullYear(),date.getMonth(),(date.getDate() +1))};
        }else if(key==='attachement'){
          if(req.body.filters[key].length ===1){
            if(req.body.filters[key][0]==="Sans"){
              findArgs['nomAttachement'] = null;
             }else{
              findArgs['nomAttachement'] = { $ne: null };
             }
            }
          
        }else{
          findArgs[key] = req.body.filters[key];
        }
      }
    }
  }
    
    console.log(findArgs)
    const rapportInters = await RapportInter.find(findArgs)
    .populate("IDintervenant")
    .populate({ path:"IDTicket",model:'Ticket',populate:{path:'IDclient',model:'Client'}})
    .sort([['dateCreation','desc']])
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
const getAttachement = async(req, res) => {
  try{
  const rapportInter = await RapportInter.findById(req.params.rapportInterId, req.body);
  res.status(200).json({
    success: "true",
    data : rapportInter.attachement.toString('base64'),
    nomFichier : rapportInter.nomAttachement
 });
 } catch(err) {
   res.status(404).json({
     success: "false",
   msg:err
   });
 } 
}

const createRapportInter = async (req, res) => {
  const newRapportInter = new RapportInter(req.body);
  try{
    if(req.files !== null){
       newRapportInter.attachement = new Buffer.from(req.files.attachement.data, 'base64');
       newRapportInter.nomAttachement = req.files.attachement.name;
    }
    const rapportInter = await newRapportInter.save();
    res.status(200).json({
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
      const rapportInter = await RapportInter.findById(req.params.rapportInterId, req.body).populate("IDTicket");
      res.status(200).json({
      success: "True",
      data : rapportInter
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
  const updateRapportInter =async(req, res) => {
    const updateRappInter = req.body;
    try{
      if(req.files !== null){
        updateRappInter.attachement = new Buffer.from(req.files.attachement.data, 'base64');
        updateRappInter.nomAttachement = req.files.attachement.name;
      }
      const rapportInter = await RapportInter.findByIdAndUpdate(req.params.rapportInterId, updateRappInter, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
      success: "PATCH Rapport Inter route has been executed",
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
      const rapportInters = await RapportInter.find({IDintervenant:req.params.IDintervenant})
      .populate({ path:"IDTicket",model:'Ticket',populate:{path:'IDclient',model:'Client'}})
      .sort([['dateCreation','desc']])
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
  
  const getRapportIntersTicket = async (req, res) => {
    try{
      const rapportInters = await RapportInter.find({IDTicket:req.params.IDTicket}).populate("IDTicket");
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
    getRapportIntersTicket,
    getAttachement
  };