import React, { useEffect, useState } from "react";
import MessagesComponent from "../helpers/MessagesComponent";
import axios from "axios";
import '../css/ChatBox.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const ChatBoxComponent = (props) => {
  const {group,user}=useParams();
  const {socket}=props
  let messages = [];
  const [mes,setMes]=useState([]);
  const [username,setUser]=useState("");
  const [join,setJoin]=useState([]);
  const [myMessage,setMyMessage]=useState("");
  const navigate = useNavigate();
  useEffect(() => {
        axios
        .post(`http://localhost:8000/join/get-data`, {group:props.group})
        .then((res) => {
            // console.log("MESSAGES: ",res.data);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            messages = res.data.data.GroupMessages;
            setMessages(messages);
            // console.log(messages);
        })
        .catch((err) => {
          console.log(err);
        });
        socket.on("message", (data) => {
          var j=join;
          j.push(data.text);
          setJoin([...j]);
          socket.emit("participant",{user:props.user});
        });
  },[props.group]);
  const setMessages = (data) =>{
      (data !== undefined)? setMes(data):setMes({message:"No Participants Yet",content:"No List"});
      setUser(props.user);
  }
  const handleChange=(e)=>{
    if(e.target.value!==""){
      setMyMessage(e.target.value);
    }
  }
  const handleClick=(e)=>{
    e.preventDefault();
    axios
    .post(`http://localhost:8000/message`, {group:group,user:user,content:myMessage})
    .then((res) => {
      if(res.data.success){
        socket.emit("chat",{group:props.group,user:props.user,content:myMessage});
        setMyMessage("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleClose=()=>{
    navigate('/');
  }
  return (
    <div className="container-fluid">
      <div className="card card-bordered">
        <div className=" flex card-header justify-content-center">
          <h4 className="card-title d-inline-flex m-auto">
            <strong>{props.group}</strong>
          </h4>
          <span onClick={handleClose} className="float-end pe-auto"><i className="fa fa-times-circle text-danger close-hover" aria-hidden="true"></i></span>
        </div>
        <div className="mt-3">
          {join.map((text,i)=>{
            return <p key={i} className="text-secondary">{text}</p>
          })}
          
        </div>
        <MessagesComponent message={mes} myUser={username} socket={socket}/>
        <div className="box-footer">
          <form action="#" method="post">
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder="Chat here..."
                className="form-control"
                value={myMessage}
                onChange={handleChange}
              />
              <button type="button" onClick={handleClick} className="btn btn-warning btn-flat">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxComponent;
