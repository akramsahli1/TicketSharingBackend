const Message = require("../models/MessageModel");
 

const getMessagesTicket = async (io,id) => {
    const messages =await Message.find({IDTicket:id})
    io.to(id).emit('oldMessages', messages)
};




const createMessage = async (objet,io) => {
  
  const newMessage = new Message(objet);
  const messageAdded = await newMessage.save();
  io.to(objet.IDTicket).emit('message', messageAdded);

};


module.exports = {
    getMessagesTicket,
    createMessage
};
