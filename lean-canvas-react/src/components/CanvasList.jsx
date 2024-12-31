import CanvasItem from './CanvasItem';

function CanvasList({ filterData, searchText, isGrid }) {
  if (filterData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          {searchText ? '검색 결과가 없습니다' : '목록이 없습니다'}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`grid gap-6 ${!isGrid ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
    >
      {filterData.map(item => (
        <CanvasItem
          key={item.id}
          id={item.id}
          title={item.title}
          lastModified={item.lastModified}
          keyword={item.keyword}
        />
      ))}
    </div>
  );
}

export default CanvasList;
