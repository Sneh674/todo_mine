import React from 'react'
import './modal.css'
import { useState } from 'react'

// const Modal = (mopen,setMopen,handleDelete,todocomp) => {
//   const handleClose=()=>setMopen(false);
//   const handleDel=()=>{
//     setMopen(false)
//     handleDelete;
//   }

const Modal = ({ mopen, setMopen, handleDelete, todoToDelete}) => {
  const handleClose = () => setMopen(false);
  const handleDel = () => {
    handleDelete(todoToDelete);
    setMopen(false);
  };

  return (
    <div className='popup'>
      <div className="pop">
        <div className="sent">Do you want to delete this ToDo?</div>
        <div className='butts'>
          <button className='y' onClick={handleDel}>Yes</button>
          <button className='n' onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
