const Comment = require("../models/CommentModel");
 

const getCommentsTicket = async (io,id) => {
    const comments =await Comment.find({IDTicket:id})
    io.to(id).emit('oldComments', comments)
};




const createComment = async (objet,io) => {
  
  const newComment = new Comment(objet);
  const commentAdded = await newComment.save();
  io&& io.to(objet.IDTicket).emit('comment', commentAdded);

};


module.exports = {
  getCommentsTicket,
    createComment
};
