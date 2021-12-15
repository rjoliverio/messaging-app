import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import '../css/participant.css'

const ParticipantsListComponent = (props) => {
  const {socket} = props;
  const[join,setJoin]=useState([]);
  const[inactive,setInactive]=useState([]);
  useEffect(() => {
    socket.on("list", (data) => {
      setJoin([...data.user]);
      if(data.deletedUsers) setInactive(data.deletedUsers);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  console.log("PARTI",join, inactive);
  return (
        <Row>
            <h5 className="text-white"><i className="fa fa-user text-light" aria-hidden="true"></i> Group Participants</h5>
            <ul>
            {join.map((user,i) => (
                   <p key={i}> <span className="dotOnline"></span> <span className="text-white align-left" >{user}</span></p>
                  
            ))}
            {inactive.map((inactive,i)=> (
              (props.participants.includes(inactive) || inactive === "" || join.includes(inactive))? "":
                    <p key={i}> <span className="dot"></span> <span className="text-white align-left" >{inactive}</span></p>
              ))}
                  {props.participants.map((offline,i)=> (
                    (join.includes(offline) || (join.includes(offline) && inactive.includes(offline)) )? "":
                    <p key={i}> <span className="dot"></span> <span className="text-white align-left" >{offline}</span></p>
                  ))}
            </ul>
        </Row>
  );
};

export default ParticipantsListComponent;
