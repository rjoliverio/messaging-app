import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ParticipantsListComponent from "../helpers/ParticipantsListComponent";
import axios from "axios";

const AppDetailsComponent = (props) => {
  let dataHistory = [];
  const [data,setData]=useState([]);
  useEffect(() => {
        axios
        .post(`http://localhost:8000/join/get-data`, {group:props.group})
        .then((res) => {
            // console.log(res.data.data.GroupParticipants);
            dataHistory = res.data.data.GroupParticipants;
            setUsers(dataHistory);
            // console.log(dataHistory);
        })
        .catch((err) => {
          console.log(err);
        });
        
  },[props.group]);
  const setUsers = (data) =>{
      (data !== undefined)? setData(data):setData({message:"No Participants Yet",content:"No List"});
  }
  return (
    <div className="container-fluid">
      <h1 className="text-white">{props.group}</h1>
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
        <ParticipantsListComponent participants={data}/>
      </Row>
    </div>
  );
};

export default AppDetailsComponent;
