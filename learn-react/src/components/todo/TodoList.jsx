import React from 'react';

function TodoList({onDeleteTodo, todos = []}) {
  const items = [...todos] ;
  return (
    <ul>
      {items.map(item => <li key={item.id}>
        <input type='checkbox' checked={item.done}
          onChange={(e) => {
            console.log(e.target.checked)
          }}
        />
        <span>{item.done ? (<del>{item.text}</del>) : item.text}</span>
        <button onClick={() => onDeleteTodo(item.id)}>X</button>
      </li>)}
    </ul>
  );
}

export default TodoList;