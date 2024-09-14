import React from 'react'
import { useState } from 'react'

const Todocard = () => {
  return (
    <div className="listBox">
      {todos.map(item => {

        return <div className="TODO">
          <div className="checktxt">
            <input type="checkbox" value={todo.isComp} name="comp" id="" />
            <div className="thing">{item.todo}</div>
          </div>

          <div className="edel">
            <button className="edit" onClick={handleEdit}>edit</button>
            <button className="delete" onClick={handleDelete}>delete</button>
          </div>
        </div>
      })}
    </div>
  )
}

export default Todocard
