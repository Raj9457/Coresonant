
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users/1/todos';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (title) => {
    if (title.trim() !== '') {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            completed: false,
          }),
        });

        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todos.find((todo) => todo.id === id).completed,
        }),
      });

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const editTodo = async (id, newTitle) => {
    setTodos((prevTodos) =>
          prevTodos.map((todo) =>{
            if(id==todo.id){
              todo.title=newTitle;
            }
            return todo            
            }) 
        );
        console.log(todos)
    // try {
    //   const response = await fetch(`${API_ENDPOINT}/?id=${id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       title: newTitle,
    //     }),
    //   });

    //   if (response.ok) {
    //     // Update the local state with the edited task
    //     console.log(newTitle)
    //     setTodos((prevTodos) =>
    //       prevTodos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    //     );
    //   } else {
    //     console.error('Failed to edit todo. Server returned:', response);
    //   }
    //   console.log(todos)
    //   fetchTodos();
    // } catch (error) {
    //   console.error('Error editing todo:', error);
    // }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE',
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filteredTodos = filterCompleted ? todos.filter((todo) => todo.completed) : todos;

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div>
        <label>
          Show Completed
          <input
            type="checkbox"
            checked={filterCompleted}
            onChange={() => setFilterCompleted(!filterCompleted)}
          />
        </label>
      </div>
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
      
    </div>
  );
};

export default TodoApp;
