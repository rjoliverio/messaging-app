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

var users = [{}];
var delUsers = [{}];

io.on("connection", (socket) => {
  //for a new user joining the room
  var credentials={}
  socket.on("joinRoom", ({ user, group, is_creator }) => {
    // create user
    credentials.user=user;
    credentials.group=group;
    console.log(socket.id, "=id");
    socket.join(group);
    if(!users.some(({user,group})=> user===credentials.user && group===credentials.group)){
      users.push(credentials);
    }
    console.log(users);
    console.log(delUsers);
    if(delUsers.some(({user,group})=> user===credentials.user && group===credentials.group)){
      // delUsers.splice(delUsers.indexOf(credentials),1);
      delUsers2 = delUsers.filter(item => JSON.stringify(item) !== JSON.stringify(credentials));
      console.log(delUsers2);
      delUsers=delUsers2;
    }
    console.log(delUsers);
    // delUsers.push(credentials);
    

    if(is_creator){
      //display a creation message to the user who created the room
      socket.emit("message", {
        text: `You created the group chat ${group}`,
      });
    }else{
      //display a welcome message to the user who have joined a room
      socket.emit("message", {
        text: `Welcome to ${group}, ${user}`,
      });
    }

    //displays list of active users
    io.to(group).emit("list", {
      user:users,
      deletedUsers:delUsers
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(group).emit("message", {
      text: (is_creator)? "":`${user} has joined ${group}`,
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
    io.to(credentials.group).emit("message", {
      text: `${credentials.user} has left the room`,
    });
    console.log(users);
    console.log(delUsers);
    var deleted=users.splice(users.indexOf(credentials), 1);
    // var duplicates = [...new Set(delUsers.map(x => x.user && x.group))];
    if(!delUsers.some(({user,group})=> user===deleted[0].user && group===deleted[0].group)){
      delUsers.push(deleted[0]);
    }
    console.log(delUsers);
    io.to(credentials.group).emit("list", {
      user:users,
      deletedUsers:delUsers
    });
    if(users.length == 0){
      delUsers = [];
    }
  });
});