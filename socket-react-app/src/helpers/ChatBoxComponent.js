import React, { useEffect, useState } from "react";
import MessagesComponent from "../helpers/MessagesComponent";
import axios from "axios";
import '../css/ChatBox.css'

const ChatBoxComponent = (props) => {
  let messages = [];
  const [mes,setMes]=useState([]);
  const [user,setUser]=useState("");
  useEffect(() => {
        axios
        .post(`http://localhost:8000/join/get-data`, {group:props.group})
        .then((res) => {
            console.log("MESSAGES: ",res.data);
            messages = res.data.data.GroupMessages;
            setMessages(messages);
            console.log(messages);
        })
        .catch((err) => {
          console.log(err);
        });
        
  },[props.group]);
  const setMessages = (data) =>{
      (data !== undefined)? setMes(data):setMes({message:"No Participants Yet",content:"No List"});
      setUser(props.user);
  }
  return (
    <div className="container-fluid">
      <div className="card card-bordered">
        <div className="card-header">
          <h4 className="card-title">
            <strong>{props.group}</strong>
          </h4>
        </div>
        <MessagesComponent message={mes} myUser={user}/>
        <div className="box-footer">
          <form action="#" method="post">
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder="Chat here..."
                className="form-control"
              />
              <button type="button" className="btn btn-warning btn-flat">
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
