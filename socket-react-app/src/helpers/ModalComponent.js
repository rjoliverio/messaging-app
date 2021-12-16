import React from 'react'
import { Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ModalComponent = (props) => {
    const {show,setShow,isJoin,socket}=props;
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const bool = {isJoin};
        console.log("Body: ", data);
        if(bool.isJoin === true){
            axios.get('http://localhost:8000/join/' + data.group + "/" + data.user)
            .then(res => {
                socket.emit("joinRoom", { user:data.user, group:data.group, is_creator:false });
                navigate('/chat/'+ res.data.data.group.gc_id + '/' + res.data.data.user.participant_id);
            }).catch((e) => {
                console.log(e);
            })
        }else{
            axios.post(`http://localhost:8000/create`, data)
                .then(res => {
                if(res.data.success===true){
                    socket.emit("joinRoom", { user:data.user, group:data.group, is_creator:true });
                    navigate(`/chat/${res.data.data.gc_id}/${res.data.data.participant_id}`);
                }
            })
        }
        
        
    };
    return (
        <Modal show={show} onHide={()=>setShow(false)} centered >
        <Modal.Header closeButton>
          <Modal.Title>{isJoin?(<><i className="fa fa-video-camera" aria-hidden="true"></i>&nbsp;<span>Join Group Chat</span></>):(<><i className="fa fa-users" aria-hidden="true"></i>&nbsp;<span>Create New Group Chat</span></>)}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
        
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input type="text" className="form-control" id="exampleInputUsername" required {...register("user")} placeholder='jonsnow'/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">{isJoin?("Group Name"):("New Group Name")}</label>
                <input type="text" className="form-control" id="exampleInputGroupChat" required {...register("group")} placeholder='House Stark'/>
            </div>
        
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={()=>setShow(false)}>Close</button>
            <button type="submit" className="btn btn-primary" >{isJoin?("Enter Group"):("Create Group")}</button>
        </Modal.Footer>
        </form>
      </Modal>
    )
}

export default ModalComponent
