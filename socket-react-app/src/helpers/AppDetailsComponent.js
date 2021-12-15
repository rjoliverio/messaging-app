import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ParticipantsListComponent from "../helpers/ParticipantsListComponent";
import axios from "axios";

const AppDetailsComponent = (props) => {
  const {socket}=props;
  let dataHistory = [];
  const [data,setData]=useState([]);
  useEffect(() => {
        axios
        .post(`http://localhost:8000/join/get-data`, {group:props.group})
        .then((res) => {
            // console.log(res.data.data.GroupParticipants);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            // console.log(res.data.data.GroupParticipants);
            // setData([...res.data.data.GroupParticipants]);
            for(var x = 0; x < res.data.data.GroupParticipants.length; x++){
              dataHistory.push(res.data.data.GroupParticipants[x].participant_username);
            }
            setUsers(dataHistory);
            console.log(data);
            console.log(dataHistory);
            // console.log(dataHistory);
        })
        .catch((err) => {
          console.log(err);
        });
        
  },[setData,props.group, socket]);
  const setUsers = (data) =>{
      (data !== undefined)? setData(data):setData({message:"No Participants Yet",content:"No List"});
  }
  return (
    <div className="container-fluid">
      <Row>
        <h1 className="text-white">Omingle</h1>
      </Row>
      <Row>
        <h3 className="text-white">Description</h3>
      </Row>
      <Row>
        <h5 className="text-white">IT3206 Integrative Programming</h5>
        &nbsp;
        <h5 className="text-white">Oliverio, Rogelio John M.</h5>
        <h5 className="text-white">Ondoy, Aljann Niño J.</h5>
      </Row>
      <hr className="text-white" />
      <Row>
        <ParticipantsListComponent participants={data} socket={socket}/>
      </Row>
    </div>
  );
};

export default AppDetailsComponent;
