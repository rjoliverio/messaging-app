import React, { useEffect, useState } from "react";
import ChatBoxComponent from "../helpers/ChatBoxComponent";
import AppDetailsComponent from "../helpers/AppDetailsComponent";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";
const ChatComponent = (props) => {
  const [info,setInfo]=useState({myGroup:"",myUserName:""});
  const navigate = useNavigate();
  const {group,user}=useParams();
  useEffect(() => {
    axios.post(`http://localhost:8000/create/check`, {group:group,user:user})
        .then(res => {
            if(!res.data.success){
                navigate('/');
            }else{
              let gc=res.data.data.ParticipantGroupChat[0].gc_name;
              let p=res.data.data.participant_username;
              setInfo({myGroup:gc,myUserName:p})
            }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <ChatBoxComponent group={info.myGroup} />
        </Col>
        <Col>
          <AppDetailsComponent  />
        </Col>
      </Row>
    </div>
  );
};

export default ChatComponent;
