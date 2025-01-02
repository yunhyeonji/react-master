import { useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Categoryfilter from '../components/Categoryfilter';

function Home() {
  const [isGrid, setIsGrid] = useState(true);
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });

  const handleFilter = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const queryClient = useQueryClient();

  // 1] 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () =>
      getCanvases({ title_like: filter.searchText, category: filter.category }),
    initialData: [],
  });

  // 2] 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  // 3] 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const handleDeleteCanvas = async id => {
    deleteCanvasMutation(id);
  };

  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <Categoryfilter
            category={filter.category}
            onChange={val => handleFilter('category', val)}
          />
        </div>
        <ViewToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <div className="flex justify-end mb-6">
        <Button loading={isLoadingCreate} onClick={handleCreateCanvas}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filterData={data}
          searchText={filter.searchText}
          isGrid={isGrid}
          onDeleteItem={handleDeleteCanvas}
        />
      )}
    </>
  );
}

export default Home;
