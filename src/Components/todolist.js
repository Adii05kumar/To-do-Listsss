import React, { useState } from 'react';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputValue(todoToEdit.text);
      setEditingId(id);
    }
  };

  const updateTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingId ? { ...todo, text: inputValue } : todo
        )
      );
      setInputValue('');
      setEditingId(null);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={editingId ? updateTodo : addTodo}>
        {editingId ? 'Update Todo' : 'Add Todo'}
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;