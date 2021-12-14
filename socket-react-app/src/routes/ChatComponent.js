import React, { useEffect, useState } from "react";
import ChatBoxComponent from "../helpers/ChatBoxComponent";
import AppDetailsComponent from "../helpers/AppDetailsComponent";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatComponent = (props) => {
  const {socket}=props;
  const [info,setInfo]=useState({myGroup:"",myUserName:""});
  const {group,user}=useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.post(`http://localhost:8000/create/check`, {group:group,user:user})
        .then(res => {
            if(!res.data.success){
                navigate('/');
            }else{
              let gc=res.data.data.ParticipantGroupChat[0].gc_name;
              let p=res.data.data.participant_username;
              setInfo({myGroup:gc,myUserName:p});
            }
    })
    return ()=>{
      socket.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <ChatBoxComponent group={info.myGroup} user={info.myUserName} socket={socket}/>
        </Col>
        <Col>
          <AppDetailsComponent  group={info.myGroup} socket={socket}/>
        </Col>
      </Row>
    </div>
  );
};

export default ChatComponent;
