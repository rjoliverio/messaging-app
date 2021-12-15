import React, { useEffect, useRef } from "react";

const MessagesComponent = (props) => {
    // console.log("USER", props.myUser)
    const {socket,recents,setRecents}=props;
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        socket.on("conversation", (data) => {
            var temp=recents;
            temp.push({data:data,hasText:false,text:""});
            setRecents([...temp]);
        });
        scrollToBottom();
    }, [recents, setRecents, socket])
    useEffect(() => {
        scrollToBottom();
    }, [props.message])
  return (
    <div className="box overflow-auto" id="chat-content">
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
            (!convo.hasText)?(
                (convo.data.user !== props.myUser)?
                <div key={i} className="w-100 d-flex justify-content-start text-start">
                    <div className="p-3 text-white"> 
                        <span className="fw-bold fw-size text-dark d-block">{convo.data.user}</span>
                        <div className="bg-secondary p-2 rounded text-wrap position-relative d-inline-block">{convo.data.content}</div>
                    </div>
                </div>:
                <div key={i} className="w-100 d-flex justify-content-end text-end">
                    <div className="p-3 text-white"> 
                        <span className="fw-bold fw-size text-dark d-block">{convo.data.user}</span>
                        <div className="bg-primary p-2 rounded text-wrap position-relative d-inline-block">{convo.data.content}</div>
                    </div>
                </div>
            ):(
                <p key={i} className="text-secondary">{convo.text}</p>
            )
        ))}
        <div ref={messagesEndRef} />
  </div>
  );
};

export default MessagesComponent;
