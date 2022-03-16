import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {HomePage} from './components/HomePageComponent';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import WalletComponent from './components/WalletComponent';



const RenderWalletComponent = () => {

  const {walletPath = '', networkPath = '', assetPath = '', amountPath = ''} = useParams();
  //const validSlug = isValidSlug(walletPath);

  return (
      <WalletComponent
        walletPath={walletPath} 
        networkPath={networkPath} 
        assetPath={assetPath} 
        amountPath={amountPath} 
        />
    );
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route index element={<HomePage />} />
        <Route path=":walletPath" element={<App />} >
          <Route index element={<RenderWalletComponent />} />
          <Route path=":walletPath/:networkPath" element={<RenderWalletComponent />} />
          <Route path=":walletPath/:networkPath/:amountPath" element={<RenderWalletComponent />} />
          <Route path=":walletPath/:networkPath/:assetPath" element={<RenderWalletComponent />} />
          <Route path=":walletPath/:networkPath/:assetPath/:amountPath" element={<RenderWalletComponent />} />
        </Route>
    </Routes>
  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();