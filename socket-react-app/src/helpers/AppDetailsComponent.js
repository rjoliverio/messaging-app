import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ParticipantsListComponent from "../helpers/ParticipantsListComponent";
import axios from "axios";

const AppDetailsComponent = (props) => {
  const {socket}=props;
  var dataHistory = [{}];
  var primaryData = {};
  const [data,setData]=useState([]);
  useEffect(() => {
        axios
        .post(`http://localhost:8000/join/get-data`, {group:props.group})
        .then((res) => {
            for(var x = 0; x < res.data.data.GroupParticipants.length; x++){
              primaryData.user = res.data.data.GroupParticipants[x].participant_username;
              primaryData.group = props.group;
              console.log(x,primaryData.user, primaryData.group);
              console.log("COMPLETE", primaryData);
              dataHistory.push(JSON.parse(JSON.stringify(primaryData)));
              console.log(dataHistory);
              
            }
            setUsers(dataHistory);
            console.log(dataHistory);
            
            // console.log(dataHistory);
        })
        .catch((err) => {
          console.log(err);
        });
        
  },[props.group, socket]);
  const setObject = (data) => {
    dataHistory.push(data);
  }
  const setUsers = (data) =>{
      (data !== undefined)? setData(data):setData({message:"No Participants Yet",content:"No List"});
  }
  return (
    <div className="container-fluid">
      <Row>
        <h1 className="text-white">Omingle</h1>
      </Row>
      <Row>
        <p className="text-white">A group messaging application</p>
      </Row>
      <Row>
        <h5 className="text-white">IT3206 Integrative Programming</h5>
        &nbsp;
        <h6 className="text-white">Oliverio, Rogelio John M.</h6>
        <h6 className="text-white">Ondoy, Aljann Niño J.</h6>
      </Row>
      <hr className="text-white" />
      <Row>
        <ParticipantsListComponent participants={data} group={props.group} socket={socket}/>
      </Row>
    </div>
  );
};

export default AppDetailsComponent;
