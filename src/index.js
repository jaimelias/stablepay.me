import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {HomePage} from './components/HomePageComponent';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path=":walletPath" element={<App />} />
      <Route path=":walletPath/:networkPath" element={<App />} />
      <Route path=":walletPath/:networkPath/:amount" element={<App />} />
      <Route path=":walletPath/:networkPath/:coinPath/:amount" element={<App />} />
    </Routes>
  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();
