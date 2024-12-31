import { FaList, FaTh } from 'react-icons/fa';

function ViewToggle({ isGrid, setIsGrid }) {
  return (
    <div className="flex space-x-2">
      <button
        className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isGrid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-label="Grid view"
        onClick={() => setIsGrid(true)}
      >
        <FaTh />
      </button>
      <button
        className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isGrid ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
        aria-label="List view"
        onClick={() => setIsGrid(false)}
      >
        <FaList />
      </button>
    </div>
  );
}

export default ViewToggle;
