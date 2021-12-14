import React, { useEffect, useState } from "react";

const MessagesComponent = (props) => {
    // console.log("USER", props.myUser)
    const {socket,join}=props;
    const [recents,setRecents]=useState([])
    useEffect(() => {
        socket.on("conversation", (data) => {
            var temp=recents;
            temp.push(data);
            setRecents([...temp]);
        });
    }, [props.group, recents, socket])
  return (
    <div className="box overflow-auto" id="chat-content">
        <div className="mt-3">
          {join.map((text,i)=>{
            return <p key={i} className="text-secondary">{text}</p>
          })}
          
        </div>
        {props.message.map((mes) => (
            (mes.MessageParticipant.participant_username !== props.myUser)?
                <div className="w-100 d-flex justify-content-start text-start">
                    <div className="p-3 text-white"> 
                        <span class="fw-bold fw-size text-dark d-block">{mes.MessageParticipant.participant_username}</span>
                        <div className="bg-secondary p-2 rounded text-wrap position-relative d-inline-block">{mes.message_content}</div>
                    </div>
                </div>:
                <div className="w-100 d-flex justify-content-end text-end">
      
                <div className="p-3 text-white"> 
                    <span class="fw-bold fw-size text-dark d-block">{mes.MessageParticipant.participant_username}</span>
                    <div className="bg-primary p-2 rounded text-wrap position-relative d-inline-block">{mes.message_content}</div>
                </div>
                </div>   
        ))}
        {recents.map((convo) => (
            (convo.user !== props.myUser)?
                <div className="w-100 d-flex justify-content-start text-start">
                    <div className="p-3 text-white"> 
                        <span class="fw-bold fw-size text-dark d-block">{convo.user}</span>
                        <div className="bg-secondary p-2 rounded text-wrap position-relative d-inline-block">{convo.content}</div>
                    </div>
                </div>:
                <div className="w-100 d-flex justify-content-end text-end">
                    <div className="p-3 text-white"> 
                        <span class="fw-bold fw-size text-dark d-block">{convo.user}</span>
                        <div className="bg-primary p-2 rounded text-wrap position-relative d-inline-block">{convo.content}</div>
                    </div>
                </div>   
        ))}
    
  </div>
  );
};

export default MessagesComponent;
