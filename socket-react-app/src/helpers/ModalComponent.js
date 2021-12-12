import React from 'react'
import { Modal } from 'react-bootstrap';

const ModalComponent = (props) => {
    const {show,setShow,isJoin}=props;
    return (
        <Modal show={show} onHide={()=>setShow(false)} centered >
        <Modal.Header closeButton>
          <Modal.Title>{isJoin?(<><i className="fa fa-video-camera" aria-hidden="true"></i>&nbsp;<span>Join Group Chat</span></>):(<><i className="fa fa-users" aria-hidden="true"></i>&nbsp;<span>Create New Group Chat</span></>)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input type="text" class="form-control" id="exampleInputUsername" placeholder='jonsnow'/>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">{isJoin?("Group Name"):("New Group Name")}</label>
                <input type="text" class="form-control" id="exampleInputGroupChat" placeholder='House Stark'/>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={()=>setShow(false)}>Close</button>
            <button type="button" className="btn btn-primary">{isJoin?("Enter Group"):("Create Group")}</button>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalComponent
