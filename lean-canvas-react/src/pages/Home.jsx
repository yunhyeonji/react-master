import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases } from '../components/api/canvas';

function Home() {
  const [isGrid, setIsGrid] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  /** 데이터 가져오기 */
  async function fetchData() {
    const res = await getCanvases();
    setData(res.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const filterData = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <CanvasList
        filterData={filterData}
        searchText={searchText}
        isGrid={isGrid}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default Home;
