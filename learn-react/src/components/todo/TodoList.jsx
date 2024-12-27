import React from 'react';
import TodoItem from './TodoItem';
import { useTodos } from '../../context/TodoContext';

function TodoList() {
  const todos = useTodos();
  const items = [...todos] ;
  return (
    <ul>
      {items.map(item => <li key={item.id}>
        <TodoItem 
          item={item}
        />
      </li>)}
    </ul>
  );
}

export default TodoList;