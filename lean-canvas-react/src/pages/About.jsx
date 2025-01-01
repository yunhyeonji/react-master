import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Button from '../components/Button';

function About() {
  const queryClient = useQueryClient();

  // 데이터 조회 - useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ['canvases'],
    queryFn: () =>
      axios.get('http://localhost:8000/canvases/').then(res => res.data),
    initialData: [],
  });

  // 데이터 추가 - useMutation
  const { mutate: createNewCanvas, isLoading: isCreateLoading } = useMutation({
    mutationFn: canvas => axios.post('http://localhost:8000/canvases/', canvas),
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
  });

  const handleCreate = () => {
    createNewCanvas({ title: 'new canvas' });
  };
  return (
    <>
      <h2 className="p-2">useQuery</h2>
      {isLoading && <p>...Loading</p>}
      {error && <p>{error.message}</p>}
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
      <hr />
      <h2 className="p-2">useMutation</h2>
      <Button loading={isCreateLoading} onClick={handleCreate}>
        등록
      </Button>
    </>
  );
}

export default About;
