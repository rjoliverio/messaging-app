/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import MessagesComponent from "../helpers/MessagesComponent";
import axios from "axios";
import '../css/ChatBox.css'
// import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const ChatBoxComponent = (props) => {
  const {group,user}=useParams();
  const {socket}=props
  let messages = [];
  const [mes,setMes]=useState([]);
  const [username,setUser]=useState("");
  const [myMessage,setMyMessage]=useState("");
  const [recents,setRecents]=useState([]);
  // const navigate = useNavigate();
  useEffect(() => {
        axios
        .post(`http://localhost:8000/join/get-data`, {group:props.group})
        .then((res) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            messages = res.data.data.GroupMessages;
            setMessages(messages);
        })
        .catch((err) => {
          console.log(err);
        });
        socket.on("message", (data) => {
          var j=recents;
          j.push({data:null,hasText:true,text:data.text});
          setRecents([...j]);
        });
  },[props.group]);
  const setMessages = (data) =>{
      (data !== undefined)? setMes(data):setMes({message:"No Participants Yet",content:"No List"});
      setUser(props.user);
  }
  const handleChange=(e)=>{
    setMyMessage(e.target.value);
  }
  const handleClick=(e)=>{
    e.preventDefault();
    if(myMessage!==""){
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
  }
  return (
    <div className="container-fluid">
      <div className="card card-bordered">
        <div className=" flex card-header justify-content-center">
          <h4 className="card-title d-inline-flex m-auto">
            <strong>{props.group}</strong>
          </h4>
          <a href="/" className="float-end pe-auto"><i className="fa fa-times-circle text-danger close-hover" aria-hidden="true"></i></a>
        </div>
        
        <MessagesComponent message={mes} myUser={username} recents={recents} setRecents={setRecents} socket={socket}/>
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
