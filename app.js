require("dotenv").config();
const x= require("./helpers/initMongodb");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const fileupload = require('express-fileupload');
const router = require('./routes/router');
const authRouter = require("./routes/authRoutes");
const ticketRouter = require("./routes/ticketRoutes");
const membSocieteRouter = require("./routes/membSocieteRoutes");
const clientRouter = require("./routes/clientRoutes");
const mailingRouter = require("./routes/mailingRoutes");
const contratRouter = require("./routes/contratRoutes");
const rapportInterRouter = require("./routes/rapportInterRoutes");
const affecterRouter = require("./routes/affecterRoutes");
const feedBackRouter = require("./routes/feedBackRoutes");
const statistiqueRoutes = require("./routes/statistiqueRoutes");
const socketio = require('socket.io');
const http = require('http');
const commentController = require("./controllers/commentController");
const messageController = require("./controllers/messageController");



// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`uploads`));
app.use(fileupload())
app.use(cors());

app.use("/api/v1/",router);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/ticket",ticketRouter);
app.use("/api/v1/membSociete",membSocieteRouter);
app.use("/api/v1/client",clientRouter);
app.use("/api/v1/mailing",mailingRouter);
app.use("/api/v1/contrat",contratRouter);
app.use("/api/v1/rapportInter",rapportInterRouter);
app.use("/api/v1/affectation",affecterRouter);
app.use("/api/v1/feedBack",feedBackRouter);
app.use("/api/v1/statistique",statistiqueRoutes);

app.use("/", (req, res, next) => {
  console.log("Introuvable !");
  res.status(404).json({
    status: 404,
    message: "Page not found!",
  });
});
const server = http.createServer(app);

// Running the server
const PORT = process.env.PORT || 8000;


const usersComment = [];
const usersMessage = [];
const messageVu =[]

const io = socketio(server,{cors:{origin:"*"}});
io.on('connect', (socket) => {
  socket.on('joinComment', ({ name, IDTicket,role }) => {
    console.log( IDTicket)
    socket.join(IDTicket);
    if(role!=="Ad"){
      
    const newComment = { IDTicket, user:'chatAdmin', text: `${name} a rejoint ` ,date:new Date()};
    usersComment.findIndex((user)=>user.IDTicket === IDTicket && user.name === name)===-1&&commentController.createComment(newComment)
    usersComment.push({name,IDTicket})
    }
    commentController.getCommentsTicket(io,IDTicket)
    console.log("commentuser:")
   console.log(usersComment)
  });

  socket.on('sendComment', (objet, callback) => {
    const newComment ={IDTicket:objet.IDTicket, user:objet.name, text: objet.comment ,date:new Date()}
    commentController.createComment(newComment,io)
    callback()
  });

  socket.on('disconnectComment', (objet) => {  
      const newComment ={
                  IDTicket:objet.IDTicket,
                  user: 'chatAdmin' ,
                  text: `${objet.name} a quitté `,
                  date:new Date(),
                }
      usersComment.splice(usersComment.findIndex((user)=>user.IDTicket === newComment.IDTicket && user.name === objet.name), 1)  
     if(usersComment.findIndex((user)=>user.IDTicket === newComment.IDTicket && user.name === objet.name)===-1 ){  
      commentController.createComment(newComment,io)     
    }
  });



  socket.on('joinChat', ({ name, IDTicket,role }) => {
    socket.join(IDTicket);
    if(role!=="In"){
      messageVu.findIndex((ob)=>ob.IDTicket==IDTicket)!==-1&&messageVu.splice(messageVu.findIndex((ob)=>ob.IDTicket==IDTicket), 1) 
    }
    if(role!=="Ad"){   
        usersMessage.push({name,IDTicket,role})
        io.to(IDTicket).emit('usermessage',usersMessage);
    }

    messageController.getMessagesTicket(io,IDTicket)
  
   console.log("chatuser:")
   console.log(usersMessage)
  });

  socket.on('sendMessage', (objet, callback) => {
    const newMessage ={IDTicket:objet.IDTicket, user:objet.name, contenu: objet.message ,date:new Date(),type:objet.type}
    messageController.createMessage(newMessage,io)
    callback()
    console.log('ee')
    if(objet.role==='In'&&objet.connecte===false){
      const index= messageVu.findIndex((ob)=>ob.IDTicket==objet.IDTicket);
      index===-1
      ?messageVu.push({IDTicket:objet.IDTicket,nbr:1})
      :messageVu[index]={IDTicket:objet.IDTicket,nbr:messageVu[index].nbr+1}
      io.to(objet.IDTicket).emit('messageNonVu', messageVu); 
    }
    console.log(messageVu)
  
  });

  socket.on('messagesNomLu', (objet) => {
    socket.join(objet.IDTicket);
    io.to(objet.IDTicket).emit('messageNonVu', messageVu);
  
  });



  socket.on('disconnectChat', (objet) => {  
    usersMessage.findIndex((user)=>user.IDTicket === objet.IDTicket && user.name === objet.name)!==-1&&usersMessage.splice(usersMessage.findIndex((user)=>user.IDTicket === objet.IDTicket && user.name === objet.name), 1)
    io.to(objet.IDTicket).emit('usermessage',usersMessage);
  });
});


server.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
