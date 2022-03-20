import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {HomePage} from './components/HomePageComponent';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {RouteMainComponent, RouteWalletComponent} from './components/elements/routeProviders';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<HomePage />} />
          <Route path=":walletNameParam" element={<RouteMainComponent />} >
            <Route index element={<RouteWalletComponent />} />
            <Route path=":networkParam" element={<RouteWalletComponent />} />
            <Route path=":networkParam/:assetParam" element={<RouteWalletComponent />} />
            <Route path=":networkParam/:assetParam/:amountParam" element={<RouteWalletComponent />} />
          </Route>
        </Route>

    </Routes>
  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();