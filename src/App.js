// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={[<Banner/>,<Movies/>]} />
     
      <Route exact path="/favourites" element={<Favourites/>}/>
      </Routes>
    </Router>
    
    
  );
}

export default App;
