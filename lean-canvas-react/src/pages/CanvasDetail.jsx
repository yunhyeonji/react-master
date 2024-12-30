import { useLocation, useParams, useSearchParams } from 'react-router-dom';

function CanvasDetail() {
  const { id } = useParams();
  const [searchParms] = useSearchParams();
  const location = useLocation();

  return (
    <>
      <div>CanvasDetail</div>
      <p>userId: {id}</p>
      <p>keyword: {searchParms.get('keyword')}</p>
      <p>hash: {location.hash}</p>
    </>
  );
}

export default CanvasDetail;
