import React from "react";
import { Row } from "react-bootstrap";

const ParticipantsListComponent = (props) => {
  return (
        <Row>
            <h5 className="text-white">Group Chat Participants</h5>
            <ul>
                {props.participants.map((user) => (
                <li><h6 className="text-white align-left" key={user.participant_id}>{user.participant_username}</h6></li>
                ))}
            </ul>
        </Row>
  );
};

export default ParticipantsListComponent;
