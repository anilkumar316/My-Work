import React from 'react'
import ToDoItem from './ToDoItem'

const ToDoList = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default ToDoList
