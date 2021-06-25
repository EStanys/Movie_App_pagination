import './App.css';
import Movies from './components/movies';
import MovieFooter from './components/mvFooter';

function App() {
  return (
    <div className="App container mt-3">
      {/* <MyHeader /> */}
      <Movies />
      <MovieFooter />
    </div>
  );
}

export default App;
