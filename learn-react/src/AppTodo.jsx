import React, { useState }from 'react';
import './App.css';
import TodoList from './components/todo/TodoList';
import todoReducer from './components/reducer/todo-reducer';
import {useImmerReducer} from 'use-immer';

function AppTodo(props) {
  const [todoText, setTodoText] = useState('');
  const [todos, dispatch] = useImmerReducer(todoReducer, [
    { id : 0, text: 'HTML&CSS 공부하기', done:false},
    { id : 1, text: '자바스크립트 공부하기', done:false}
  ]);
  const [insertAt, setInsertAt] = useState(todos.length-1);

  const handleTodoTextChange = (e) => {
    setTodoText(e.target.value);
  }

  const handleAddTodo = () => {
    dispatch({
      type:'added',
      nextId: todos.length,
      todoText
    });
    setTodoText('');
  }

  const handleAddTodoByIndex = () => {
    dispatch({
      type:'added_index',
      nextId:todos.length,
      insertAt,
      todoText
    });
    setTodoText('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
      setTodoText('');
    }
  }

  const handleDelete = (deleteId) => {
    dispatch({
      type:'delete',
      deleteId
    });
  }

  const handelDone = (id, done) => {
    dispatch({
      type:'done',
      id,
      done
    })
  }

  const handleReverse = () => {
    dispatch({
      type:'reverse'
    })
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
            <option key={index} value={index}>{index} 번째</option>
          ))}
        </select>
        <button onClick={handleAddTodoByIndex}>{insertAt} 번째 추가</button>
      </div>
      <p>preview : {todoText}</p>
      <button onClick={handleReverse}>reverse</button>
      <TodoList todos={todos} onDeleteTodo={handleDelete} onToggleTodo={handelDone}/>
    </div>
  );
}

export default AppTodo;