import './App.css';
import PullUpImpure from './components/PullUpImpure';
import PullUpPure from './components/PullUpPure';

export default function AppPure(props) {
  return (
    <div>
      <h3>순수하지 않은 컴포넌트</h3>
      <PullUpImpure />
      <PullUpImpure />
      <PullUpImpure />
      <hr />
      <h3>순수한 컴포넌트</h3>
      <PullUpPure counter={11} />
      <PullUpPure counter={12} />
      <PullUpPure counter={11} />
    </div>
  );
}
