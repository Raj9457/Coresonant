import React, { useState } from 'react';

const TodoList = ({ todos, toggleComplete, editTodo, deleteTodo }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleEditStart = (id, title) => {
    setEditingTask(id);
    setEditedTask(title);
  };

  const handleEditCancel = () => {
    setEditingTask(null);
    setEditedTask('');
  };

  const handleEditSave = (id) => {
    editTodo(id, editedTask);
    setEditingTask(null);
    setEditedTask('');
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          {editingTask === todo.id ? (
            <>
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <button onClick={() => handleEditSave(todo.id)}>Save</button>
              <button onClick={handleEditCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
              <button className="edit" onClick={() => handleEditStart(todo.id, todo.title)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
