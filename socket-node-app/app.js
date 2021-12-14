require('dotenv').config();
const express = require("express");
const socket = require("socket.io");
var bodyParser = require('body-parser');
const app=express();
const cors = require("cors");
app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
var server = app.listen(8000);
const io = socket(server);

const createRoutes=require('./routes/createGroupRoutes');
const joinRoutes=require('./routes/joinGroupRoutes');
const messageRoutes=require('./routes/messageRoutes');

app.use("/create",createRoutes);
app.use("/join", joinRoutes);
app.use("/message", messageRoutes);
//initializing the socket io connection 
io.on("connection", (socket) => {
  //for a new user joining the room
  socket.on("joinRoom", ({ user, group }) => {
    // create user
    console.log(socket.id, "=id");
    socket.join(group);

    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      text: `Welcome to ${group}, ${user}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(group).emit("message", {
      text: `${user} has joined ${group}`,
    });
  });

  //user sending message
  socket.on("chat", ({user,group,content}) => {
    //gets the room user and the message sent
    // const p_user = get_Current_User(socket.id);\
    console.log(socket.id, "=id");
    io.to(group).emit("conversation", {
      user:user,
      group:group,
      content:content
    });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    // const p_user = user_Disconnect(socket.id);

    // if (p_user) {
    //   io.to(p_user.room).emit("message", {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: `${p_user.username} has left the room`,
    //   });
    // }
  });
});