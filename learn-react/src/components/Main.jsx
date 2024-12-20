import { useState } from 'react';
import Counter from './Counter';

function Main () {
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleTotal = () => {
    setTotal(total + 1);
  }

  return (
    <main>
      <h4>FLAG : {flag.toString()}</h4>
      <button onClick={() => {setFlag(!flag)}}>Toggle Flag</button>
      <h4>TOTAL : {total}</h4>
      <Counter onTotal={handleTotal}/>
      <hr />
      <Counter onTotal={handleTotal}/>
      <hr />
      <Counter />
    </main>
  )
}

export default Main;