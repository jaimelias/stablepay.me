import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


const HomePage = () => (<h1>HomePage</h1>);

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path=":walletPath" element={<App />} />
        <Route path=":walletPath/:networkPath/:amount" element={<App />} />
        <Route path=":walletPath/:networkPath/:coinPath/:amount" element={<App />} />
      </Routes>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

reportWebVitals();
