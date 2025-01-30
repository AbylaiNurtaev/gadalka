import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import Cabinet from './pages/Cabinet/Cabinet';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/cabinet/:status" element={<Cabinet/>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
