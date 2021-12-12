import React from "react";
import { Row } from "react-bootstrap";
import '../css/ChatBox.css'

const ChatBoxComponent = (props) => {
  const { isJoin } = props;
  return (
    <div className="container-fluid">
      <div className="card card-bordered">
        <div className="card-header">
          <h4 className="card-title">
            <strong>Chat Name</strong>
          </h4>
        </div>
        <div
          className="box"
          id="chat-content"
        >
        </div>
        <div className="box-footer">
          <form action="#" method="post">
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder="Chat here..."
                className="form-control"
              />
              <button type="button" className="btn btn-warning btn-flat">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxComponent;
