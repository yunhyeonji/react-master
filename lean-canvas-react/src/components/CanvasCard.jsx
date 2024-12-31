import { FaPlus } from 'react-icons/fa';
import Note from './Note';
import { v4 as uuidv4 } from 'uuid';

function CanvasCard({ notes = [], title, isSubTitle = false, onNotesChange }) {
  // 노트 생성
  const handleCreateNote = () => {
    const newNote = {
      id: uuidv4(),
      content: '',
      color: '',
    };
    onNotesChange([...notes, newNote]);
  };

  // 노트 삭제
  const handleRemoveNote = id => {
    console.log(id);
    onNotesChange(notes.filter(note => note.id !== id));
  };

  // 노트 수정
  const handleUpdateNote = (id, content, color) => {
    onNotesChange(
      notes.map(note => (note.id === id ? { ...note, content, color } : note)),
    );
  };
  return (
    <div className="row-span-1 bg-white min-h-48 border border-collapse border-gray-300">
      <div
        className={`${!isSubTitle && 'bg-gray-100 border-b border-b-gray-300'} flex items-start justify-between px-3 py-2`}
      >
        <h3 className={`${!isSubTitle && 'font-bold'}`}>{title}</h3>
        <button
          className="bg-blue-400  text-white p-1.5 text-xs rounded-md"
          onClick={handleCreateNote}
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3 min-h-32 p-3">
        {notes.map(note => (
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            color={note.color}
            onRemoveNote={handleRemoveNote}
            onUpdateNote={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default CanvasCard;
