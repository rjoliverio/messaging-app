import React from "react";
// import { Row } from "react-bootstrap";
import '../css/ChatBox.css'

const ChatBoxComponent = (props) => {
  const { group} = props;

  return (
    <div className="container-fluid">
      <div className="card card-bordered">
        <div className="card-header">
          <h4 className="card-title">
            <strong>{group}</strong>
          </h4>
        </div>
        <div
          className="box"
          id="chat-content"
        >
          <div className="w-100 d-flex justify-content-end text-end">
            
            <div className="p-3 text-white"> 
              <span class="fw-bold fw-size text-dark d-block">jonsnow</span>
              <div className="bg-primary p-2 rounded text-wrap position-relative d-inline-block">hello world lorem ipsum </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-start text-start">
            <div className="p-3 text-white"> 
              <span class="fw-bold fw-size text-dark d-block">aryastark</span>
              <div className="bg-secondary p-2 rounded text-wrap position-relative d-inline-block">hello world</div>
            </div>
          </div>
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
