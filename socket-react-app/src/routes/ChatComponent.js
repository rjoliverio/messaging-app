import React, { useState } from "react";
import ChatBoxComponent from "../helpers/ChatBoxComponent";
import AppDetailsComponent from "../helpers/AppDetailsComponent";
import { Row, Col } from "react-bootstrap";

const ChatComponent = (props) => {
  const { isJoin } = props;
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <ChatBoxComponent isJoin={isJoin} />
        </Col>
        <Col>
          <AppDetailsComponent isJoin={isJoin} />
        </Col>
      </Row>
    </div>
  );
};

export default ChatComponent;
