import './App.css';
import MovieTable from './components/movieTable';
import MovieFooter from './components/mvFooter';

function App() {
  return (
    <div className="App container mt-3">
      {/* <MyHeader /> */}
      <MovieTable />
      <MovieFooter />
    </div>
  );
}

export default App;
