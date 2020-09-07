import React from 'react'
import Todo from "./Todo"
const TodoList = ({Url}) => {
    return (
        <div className="todo-container">
        <ul className="todo-list">
          {Url.map(urls=>(
              <Todo url={urls}   />
          ))}
          

        </ul>
      </div>
    )
}

export default TodoList
