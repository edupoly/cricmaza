import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/js/bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddPlayer from './Components/AddPlayer';
import Addteam from './Components/Addteam';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/addPlayer' element={<AddPlayer></AddPlayer>}></Route>
        <Route path="/addTeam" element={<Addteam></Addteam>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
