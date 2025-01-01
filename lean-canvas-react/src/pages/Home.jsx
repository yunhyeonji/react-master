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
import useApiRequest from '../components/hooks/useApiRequest';

function Home() {
  const [isGrid, setIsGrid] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  /** 데이터 가져오기 */
  const { isLoading, error, execute: fetchData } = useApiRequest(getCanvases);

  useEffect(() => {
    fetchData(
      { title_like: searchText },
      { onSuccess: res => setData(res.data) },
    );
  }, [searchText, fetchData]);

  const handleDeleteCanvas = async id => {
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
  const { isLoading: isLoadingCreate, execute: createNewCanvas } =
    useApiRequest(createCanvas);

  const handleCreateCanvas = async () => {
    createNewCanvas(null, {
      onSuccess: () => {
        fetchData(
          { title_like: searchText },
          { onSuccess: res => setData(res.data) },
        );
      },
      onError: err => alert(err.message),
    });
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
          onDeleteItem={handleDeleteCanvas}
        />
      )}
    </>
  );
}

export default Home;
