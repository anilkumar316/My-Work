import React, { useState } from 'react'

const ToDoItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(task.text)

  const handleEdit = () => {
    if (newText.trim() !== '') {
      onEdit(task.id, newText)
      setIsEditing(false)
    }
  }

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span
            onClick={() => onToggle(task.id)}
            className={task.completed ? 'completed' : ''}
          >
            {task.text}
          </span>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

export default ToDoItem
