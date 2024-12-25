import React from 'react';
import './App.css';
import { useState } from 'react';
import TodoList from './components/todo/TodoList';


function AppTodo(props) {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([
    { id : 0, label: 'HTML&CSS 공부하기', done:false},
    { id : 1, label: '자바스크립트 공부하기', done:true}
  ])
  const [insertAt, setInsertAt] = useState(todos.length-1);

  const handleTodoTextChange = (e) => {
     setTodoText(e.target.value);
  }

  const handleAddTodo = () => {
    const nextId = todos.length;
    const newTodo = {id: nextId, label: todoText};
    setTodos([
      ...todos,
      newTodo
    ])
    setTodoText('');
  }

  const handleAddTodoByIndex = () => {
    const nextId = todoText.length;
    const newTodo = [
      ...todos.slice(0, insertAt),
      {id: nextId, label:todoText, done:false},
      ...todos.slice(insertAt)
    ]

    setTodos(newTodo);
    setTodoText('');
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleAddTodo();
    }
  }

  const handleTodoDelete = (deleteId) => {
    const newTodos = todos.filter(item => item.id !== deleteId);
    setTodos(newTodos);
  }

  const handelTodoToggle = (id, done) => {
    const newTodos = todos.map(item => {
      if(item.id === id){
        return {...item, done};
      }
      return item;
    })

    setTodos(newTodos);
  }
  return (
    <div>
      <h2>할일 목록</h2>
      <div>
        <input 
          type='text' 
          value={todoText} 
          onKeyDown={handleKeyDown} 
          onChange={handleTodoTextChange}
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>
      <div>
        <select value={insertAt} onChange={(e) => {setInsertAt(e.target.value)}}>
          {todos.map((_, index) => (
            <option key={item.id} value={index}>{index} 번째</option>
          ))}
        </select>
        <button onClick={handleAddTodoByIndex}>{insertAt} 번째 추가</button>
      </div>
      <p>preview : {todoText}</p>
      <TodoList todos={todos} onDeleteTodo={handleTodoDelete} onToggleTodo={handelTodoToggle}/>
    </div>
  );
}

export default AppTodo;