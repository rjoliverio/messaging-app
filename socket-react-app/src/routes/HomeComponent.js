import React, { useState } from 'react'
import ModalComponent from '../helpers/ModalComponent'

const HomeComponent = () => {
    const [show,setShow]=useState(false);
    const [isJoin,setIsJoin]=useState(true);
    const handleJoin=(data)=>{
        (data===0)?setIsJoin(true):setIsJoin(false);
        setShow(true);
    }
    return (
        
        <div className='text-white'>
             <h1 className='text-white mt-5'>Omingle</h1>
            <p>A messaging application tool</p>
            <div className='w-50 m-auto h-100 mt-5 flex justify-content-center p-5 border rounded border-1 border-white'>
                <div className="d-grid gap-3">
                    <button className="btn btn-primary btn-lg" onClick={()=>handleJoin(0)} type="button"><i className="fa fa-video-camera" aria-hidden="true"></i>&nbsp;Join Group</button>
                    <button className="btn btn-success btn-lg" onClick={()=>handleJoin(1)} type="button"><i className="fa fa-users" aria-hidden="true"></i>&nbsp;Create Group</button>
                </div>
            </div>
            {/* JOIN MODAL */}
            <ModalComponent show={show} setShow={setShow} isJoin={isJoin}/>
        </div>
    )
}

export default HomeComponent
