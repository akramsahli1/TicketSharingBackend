const FeedBack = require("../models/FeedBackModel");


const createFeedBack = async (req, res) => {
  try{
    const newFeedBack = new FeedBack(req.body);
    const feedBack = await newFeedBack.save();
    res.status(200).json({
       success: "true",
       data : feedBack
    });
  } catch(err) {
   res.status(404).json({
     success: "false",
   msg:err
   });
  } 
};
const getFeedBackTicket = async (req, res) => {
    try{
      const feedBack = await FeedBack.findOne({IDTicket:req.params.ticketId})
      res.status(200).json({
      success: "True",
      data : feedBack
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
  const updateFeedBackTicket =async(req, res) => {
    try{
        console.log( req.body,req.params.feedBackId)
     const feedBack = await FeedBack.findByIdAndUpdate(req.params.feedBackId, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
      success: "PATCH Rapport Inter route has been executed",
      data : feedBack
      }); 
    } catch(err){      
      err => console.log(err);
    }
  };

  
  module.exports = {
    createFeedBack,
    getFeedBackTicket,
    updateFeedBackTicket,
  };