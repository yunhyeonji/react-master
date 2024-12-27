import { createContext, useContext } from "react";
import todoReducer from "../components/reducer/todo-reducer";
import { useImmerReducer } from "use-immer";

export const TodoContext = createContext(null); // todos
export const TodoDispatchContext = createContext(null); // dispatch

export function TodoProvider ({children}) {
  const [todos, dispatch] = useImmerReducer(todoReducer, [
    { id : 0, text: 'HTML&CSS 공부하기', done:false},
    { id : 1, text: '자바스크립트 공부하기', done:false}
  ]);

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  )
}

export function useTodos() {
  return useContext(TodoContext);
}

export function useTodosDispatch() {
  return useContext(TodoDispatchContext);
}