export default function todoReducer(todos, action) {
  //type
  switch(action.type){
    case 'added' : {
      const {nextId, todoText} = action; 
      return [
        ...todos,
        {id: nextId, text: todoText, done:false}
      ];
    }
    case 'added_index' : {
      const {nextId, insertAt, todoText} = action;
      return [
        ...todos.slice(0, insertAt),
        {id: nextId, text:todoText, done:false},
        ...todos.slice(insertAt)
      ];
    }
    case 'reverse' : {
      return todos.toReversed();
    }
    case 'done' : {
      const {id, done} = action;
      return [
        todos.map(item => {
          if(item.id === id){
            return {...item, done};
          }
          return item;
        })
      ]
    }
    case 'delete' : {
      const {deleteId} = action;
      return todos.filter(item => item.id !== deleteId);
    }
    default : {
      throw Error('알 수 없는 액션 타입 : ' + action.type);
    }
  }
}
