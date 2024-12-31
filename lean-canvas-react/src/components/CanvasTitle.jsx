import { useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

function CanvasTitle() {
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState('Lean Canvas');

  return (
    <div className="flex items-center justify-center mb-10">
      {isEditing && (
        <div className="flex items-center">
          <input
            type="text"
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
            value={titleText}
            onChange={e => setTitleText(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Save title"
            onClick={() => setIsEditing(false)}
          >
            <FaCheck />
          </button>
        </div>
      )}
      {!isEditing && (
        <>
          <h1 className="text-4xl font-bold text-center ">{titleText}</h1>
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Edit title"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}

export default CanvasTitle;
