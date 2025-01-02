function Categoryfilter({ category, onChange }) {
  const categories = ['전체', '신규', '헬스케어', '물류', '여행'];
  return (
    <select
      className="border p-2 rounded-lg w-full sm:w-32"
      value={category}
      onChange={e => {
        const val = e.target.value;
        onChange(val === '전체' ? undefined : val);
      }}
    >
      {categories.map(cate => (
        <option key={cate} value={cate}>
          {cate}
        </option>
      ))}
    </select>
  );
}

export default Categoryfilter;
