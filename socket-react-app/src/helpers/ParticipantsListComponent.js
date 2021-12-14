import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const ParticipantsListComponent = (props) => {
  const {socket} = props;
  const[join,setJoin]=useState([]);
  useEffect(() => {
    socket.on("list", (data) => {
      if(!join.includes(data.user) && data.join){
        let j=join;
        j.push(data.user);
        setJoin([...j]);
      }else if(join.includes(data.user) && !data.join){
        let j=join;
        j.splice(j.indexOf(data.user),1);
        setJoin([...j]);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
        <Row>
            <h5 className="text-white"><i className="fa fa-circle text-success" aria-hidden="true"></i> Active Participants</h5>
            <ul>
                {join.map((user,i) => (
                  <p key={i}><i className="fa fa-user text-light" aria-hidden="true"></i> <span className="text-white align-left" >{user}</span></p>
                ))}
            </ul>
        </Row>
  );
};

export default ParticipantsListComponent;
