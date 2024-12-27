import React, { useMemo, useState } from 'react';
import TodoItem from './TodoItem';
import { useTodos } from '../../context/TodoContext';

function TodoList() {
  const todos = useTodos();
  const items = [...todos] ;

  const [isDone, setIsDone] = useState(false);

  const isDoneItems = items.filter(item => item.done === true);
  
  const getStatsCount = () => {
    console.log('getStatsCount함수 실행');
    const totalCount = items.length;
    const doneCount = isDoneItems.length;
    return {doneCount, totalCount};
  }

  const {doneCount, totalCount} = useMemo(() => getStatsCount(),[todos]);
  const filteredTodos = isDone ? isDoneItems : items;
  return (
    <>
      <div>
        <input 
          id='isDone'
          type='checkbox' 
          checked={isDone} 
          onChange={(e) => {setIsDone(e.target.checked)}}
        />
        <label htmlFor='isDone'>완료된 항목 보기 ({doneCount}/{totalCount})</label>
      </div>
      <ul>
        {filteredTodos.map(item => <li key={item.id}>
          <TodoItem 
            item={item}
          />
        </li>)}
      </ul>
    </>
  );
}

export default TodoList;