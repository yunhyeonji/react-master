export default function todoReducer(draft, action) {
  //type
  switch (action.type) {
    case 'added': {
      const { nextId, todoText } = action;
      draft.push({ id: nextId, text: todoText, done: false });
      break;
    }
    case 'added_index': {
      const { nextId, insertAt, todoText } = action;
      draft.splice(insertAt, 0, { id: nextId, text: todoText, done: false });
      break;
    }
    case 'reverse': {
      return draft.toReversed();
    }
    case 'done': {
      const { id, done } = action;
      const target = draft.find(item => item.id === id);
      target.done = done;
      break;
    }
    case 'delete': {
      const { deleteId } = action;
      return draft.filter(item => item.id !== deleteId);
    }
    default: {
      throw Error('알 수 없는 액션 타입 : ' + action.type);
    }
  }
}
