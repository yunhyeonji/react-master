import React from 'react';
import {  useTodosDispatch } from '../../context/TodoContext';

function TodoItem({item}) {
  const dispatch = useTodosDispatch();

  // todo 삭제
  const handleDelete = (deleteId) => {
    dispatch({
      type:'delete',
      deleteId
    });
  }

  // todo 완료
  const handelDone = (id, done) => {
    dispatch({
      type:'done',
      id,
      done
    })
  }

  return (
    <label>
      <input type='checkbox' checked={item.done}
          onChange={(e) => {
            handelDone(item.id, !item.done);
          }}
        />
        <span>{item.done ? (<del>{item.text}</del>) : item.text}</span>
        <button onClick={() => handleDelete(item.id)}>X</button>
    </label>
  );
}

export default TodoItem;