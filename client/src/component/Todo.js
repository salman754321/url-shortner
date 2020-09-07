import React from 'react'


const Todo = ({url}) => {

    return (
        <div className="todo">
            <li className={"todo-item"}>
                <a target="_blank" href={url} >{url}</a> 
             </li>
               
            </div>
    )
}

export default Todo
