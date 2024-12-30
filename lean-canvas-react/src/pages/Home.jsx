import { Link } from 'react-router-dom';
import { FaSearch, FaList, FaTh } from 'react-icons/fa';
import { useState } from 'react';

function Home() {
  const [isGrid, setIsGrid] = useState(true);
  const [searchText, setSearchText] = useState('');
  const dummyData = [
    {
      id: 1,
      title: '친환경 도시 농업 플랫폼',
      lastModified: '2023-06-15',
      keyword: '농업',
    },
    {
      id: 2,
      title: 'AI 기반 건강 관리 앱',
      lastModified: '2023-06-10',
      keyword: '헬스케어',
    },
    {
      id: 3,
      title: '온디맨드 물류 서비스',
      lastModified: '2023-06-05',
      keyword: '물류',
    },
    {
      id: 4,
      title: 'VR 가상 여행 서비스',
      lastModified: '2023-06-01',
      keyword: '여행',
    },
  ];
  const filterData = dummyData.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="검색"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            aria-label="검색"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
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
      </div>

      {filterData.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            {searchText ? '검색 결과가 없습니다' : '목록이 없습니다'}
          </p>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${!isGrid ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
        >
          {filterData.map(item => (
            <Link
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              to={`/canvases/${item.id}`}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  최근 수정일: {item.lastModified}
                </p>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                  {item.keyword}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
