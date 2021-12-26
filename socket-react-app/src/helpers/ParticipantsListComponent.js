import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import '../css/participant.css'

const ParticipantsListComponent = (props) => {
  const {socket} = props;
  const[join,setJoin]=useState([]);
  const[inactive,setInactive]=useState([]);
  useEffect(() => {
    socket.on("list", (data) => {
      setJoin(data.user);
      if(data.deletedUsers) setInactive(data.deletedUsers);
    });
  }, [socket])
  function objExist(arr, user, group) {
    return arr.some(function(el) {
      return el.user === user && el.group === group;
    }); 
  }
  
  console.log("PARTI",join, inactive);
  return (
        <Row>
            <h5 className="text-white"><i className="fa fa-user text-light" aria-hidden="true"></i> Group Participants</h5>
            <ul>
            {join.map((user,i) => (
            (user.group === props.group)?
                   <p key={i}> <span className="dotOnline"></span> <span className="text-white align-left" >{user.user}</span></p>:""
                  
            ))}
            {inactive.map((inactive,i)=> (
              (inactive.group === props.group )? <p key={i}> <span className="dot"></span> <span className="text-white align-left" >{inactive.user}</span></p>:""
                    
            ))}
            {props.participants.map((offline,i)=> (
              (offline.group === props.group && objExist(join, offline.user, offline.group) === false && objExist(inactive, offline.user, offline.group) === false)? <p key={i}> <span className="dot"></span> <span className="text-white align-left" >{offline.user}</span></p>:""
              
            ))}
            </ul>
        </Row>
  );
};

export default ParticipantsListComponent;
