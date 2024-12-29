import { useState } from 'react';
import { useTodos, useTodosDispatch } from '../../context/TodoContext';

function AddTodo() {
  const [todoText, setTodoText] = useState('');

  const todos = useTodos();
  const dispatch = useTodosDispatch();

  // todo 추가
  const handleAddTodo = todoText => {
    dispatch({
      type: 'added',
      nextId: todos.length,
      todoText,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={todoText}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            handleAddTodo(e.target.value);
            setTodoText('');
          }
        }}
        onChange={e => setTodoText(e.target.value)}
      />
      <button
        onClick={() => {
          setTodoText('');
          handleAddTodo(todoText);
        }}
      >
        추가
      </button>
    </div>
  );
}

export default AddTodo;
