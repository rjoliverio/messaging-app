import React from "react";
import { Row } from "react-bootstrap";

const ChatBoxComponent = (props) => {
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
        <hr className="text-white"/>
        <Row>
            <h5 className="text-white">Group Chat Participants</h5>
        </Row>
        
    </div>
    

  );
};

export default ChatBoxComponent;
