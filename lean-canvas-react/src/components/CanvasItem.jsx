import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CanvasItem({ id, title, lastModified, keyword, onDelete }) {
  return (
    <Link
      key={id}
      className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      to={`/canvases/${id}`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          최근 수정일: {lastModified}
        </p>
        <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
          {keyword}
        </span>
      </div>
      <button
        className="absolute top-2 right-2 p-2 text-red-500 rounded-full"
        onClick={onDelete}
      >
        <FaTrash />
      </button>
    </Link>
  );
}

export default CanvasItem;