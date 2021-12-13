import React from "react";

const MessagesComponent = (props) => {
    console.log("USER", props.myUser)
  return (
    <div className="box" id="chat-content">
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
    
    
  </div>
  );
};

export default MessagesComponent;
