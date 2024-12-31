import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import {
  createCanvas,
  deleteCanvas,
  getCanvases,
} from '../components/api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';

function Home() {
  const [isGrid, setIsGrid] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  /** 데이터 가져오기 */
  async function fetchData(params) {
    try {
      setIsLoading(true);
      setError(false);
      const res = await getCanvases(params);
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData({ title_like: searchText });
  }, [searchText]);

  const handleDeleteItem = async id => {
    try {
      if (!confirm('삭제하시겠습니까?')) {
        return;
      }
      await deleteCanvas(id);
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // 새로운 린 캔버스 생성
  const handleCreateCanvas = async () => {
    try {
      setIsLoadingCreate(true);
      await new Promise(resolver => setTimeout(resolver, 1000));
      await createCanvas();
      fetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <div className="flex justify-end mb-6">
        <Button loading={isLoadingCreate} onClick={handleCreateCanvas}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && (
        <Error
          message={error.message}
          onRetry={() => fetchData({ title_like: searchText })}
        />
      )}
      {!isLoading && !error && (
        <CanvasList
          filterData={data}
          searchText={searchText}
          isGrid={isGrid}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
