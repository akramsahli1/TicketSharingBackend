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
const socketio = require('socket.io');
const http = require('http');
const Comment = require("./models/CommentModel");
const Message = require("./models/MessageModel");


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

const io = socketio(server,{cors:{origin:"*"}});
io.on('connect', (socket) => {
  socket.on('joinComment', ({ name, room,role }) => {
    socket.join(room);
    if(role!=="Ad"){
    const newComment = new Comment({ room, user:'chatAdmin', text: `${name} à rejoindre ` ,date:new Date().toUTCString()});
    usersComment.findIndex((user)=>user.room === room && user.name === name)===-1&&newComment.save()
    Comment.find({room}).then(data=>io.to(room).emit('oldComments', data))
    usersComment.push({name,room})
    }else
    {
      Comment.find({room}).then(data=>io.to(room).emit('oldComments', data))
    }
    console.log("commentuser:")
   console.log(usersComment)
  });

  socket.on('sendComment', (objet, callback) => {
    const obj ={room:objet.room, user:objet.name, text: objet.comment ,date:new Date().toUTCString()}
    const newComment = new Comment(obj);
    newComment.save().then(()=>{
    io.to(objet.room).emit('comment', obj);
    callback()
  }) 
  });

  socket.on('disconnectComment', (objet) => {  
      const obj ={
                  room:objet.room,
                  user: 'chatAdmin' ,
                  text: `${objet.name} à sortir `,
                  date:new Date().toUTCString(),
                }
      usersComment.splice(usersComment.findIndex((user)=>user.room === obj.room && user.name === objet.name), 1)  
     if(usersComment.findIndex((user)=>user.room === obj.room && user.name === objet.name)===-1 ){  
        const newComment = new Comment(obj);
        newComment.save()
        io.to(obj.room).emit('comment', obj)
    }
  });



  socket.on('joinChat', ({ name, room,role }) => {
    socket.join(room);
    if(role!=="Ad"){
        
        usersMessage.push({name,room})
        io.to(room).emit('usermessage',usersMessage);

    }
    try{
    Message.find({room}).then(data=>io.to(room).emit('oldMessages', data))
    }catch{
      console.log('eror')
    }
   console.log("chatuser:")
   console.log(usersMessage)
  });

  socket.on('sendMessage', (objet, callback) => {
    const obj ={room:objet.room, user:objet.name, text: objet.message ,date:new Date().toUTCString()}
    const newMessage = new Message(obj);
    newMessage.save().then(()=>{
    io.to(objet.room).emit('message', obj);
    callback()
  }) 
  });

  // socket.on('oldStatus', (objet) => { 
  //   console.log( usersMessage.findIndex((user)=>user.room === objet.room && user.name === objet.name)!==-1)
  //   usersMessage.findIndex((user)=>user.room === objet.room && user.name === objet.name)!==-1&&io.to(objet.room).emit('status','true');
  // });

  socket.on('disconnectChat', (objet) => {  
    usersMessage.findIndex((user)=>user.room === objet.room && user.name === objet.name)!==-1&&usersMessage.splice(usersMessage.findIndex((user)=>user.room === objet.room && user.name === objet.name), 1)
    //usersMessage.findIndex((user)=>user.room === objet.room && user.name === objet.name)===-1&&socket.broadcast.to(objet.room).emit('status','false');
    io.to(objet.room).emit('usermessage',usersMessage);
  });
});


server.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
