import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div >
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
