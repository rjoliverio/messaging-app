import React, { useEffect, useState,useRef } from "react";

const MessagesComponent = (props) => {
    // console.log("USER", props.myUser)
    const {socket,join}=props;
    const messagesEndRef = useRef(null);
    const [recents,setRecents]=useState([]);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        socket.on("conversation", (data) => {
            var temp=recents;
            temp.push(data);
            setRecents([...temp]);
        });
        scrollToBottom();
    }, [props.group, recents, socket])
  return (
    <div className="box overflow-auto" id="chat-content">
        <div className="mt-3">
          {join.map((text,i)=>{
            return <p key={i} className="text-secondary">{text}</p>
          })}
          
        </div>
        {props.message.map((mes,i) => (
            (mes.MessageParticipant.participant_username !== props.myUser)?
                <div key={i} className="w-100 d-flex justify-content-start text-start">
                    <div className="p-3 text-white"> 
                        <span className="fw-bold fw-size text-dark d-block">{mes.MessageParticipant.participant_username}</span>
                        <div className="bg-secondary p-2 rounded text-wrap position-relative d-inline-block">{mes.message_content}</div>
                    </div>
                </div>:
                <div key={i} className="w-100 d-flex justify-content-end text-end">
                    <div className="p-3 text-white"> 
                        <span className="fw-bold fw-size text-dark d-block">{mes.MessageParticipant.participant_username}</span>
                        <div className="bg-primary p-2 rounded text-wrap position-relative d-inline-block">{mes.message_content}</div>
                    </div>
                </div>   
        ))}
        {recents.map((convo,i) => (
            (convo.user !== props.myUser)?
                <div key={i} className="w-100 d-flex justify-content-start text-start">
                    <div className="p-3 text-white"> 
                        <span className="fw-bold fw-size text-dark d-block">{convo.user}</span>
                        <div className="bg-secondary p-2 rounded text-wrap position-relative d-inline-block">{convo.content}</div>
                    </div>
                </div>:
                <div key={i} className="w-100 d-flex justify-content-end text-end">
                    <div className="p-3 text-white"> 
                        <span className="fw-bold fw-size text-dark d-block">{convo.user}</span>
                        <div className="bg-primary p-2 rounded text-wrap position-relative d-inline-block">{convo.content}</div>
                    </div>
                </div>   
        ))}
        <div ref={messagesEndRef} />
  </div>
  );
};

export default MessagesComponent;
