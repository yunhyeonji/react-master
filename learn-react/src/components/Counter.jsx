import { useState } from 'react';

function Counter({ onTotal }) {
  console.log('Counter');

  const [count, setCount] = useState(0);
  const handleCounter = () => {
    setCount(count + 1);
    {
      onTotal && onTotal();
    }
  };

  return (
    <>
      <button onClick={handleCounter}>Counter : {count}</button>
    </>
  );
}

export default Counter;
