import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {HomePage} from './components/HomePageComponent';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useOutletContext} from 'react-router-dom';
import WalletComponent from './components/WalletComponent';
import WalletNotFoundComponent from './components/WalletNotFoundComponent';

const RenderWalletComponent = () => {

  const params = useOutletContext();
  const {walletPath} = params;
  
  console.log(params);

  return (
      <>
        {walletPath ? <>
          
          <WalletComponent
            {...params}
            />

        </> : <><WalletNotFoundComponent /></>
        }
      </>
    );
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route index element={<HomePage />} />
        <Route path=":walletPath" element={<App />} >
          <Route index element={<RenderWalletComponent />} />
          <Route path=":networkPath" element={<RenderWalletComponent />} />
          <Route path=":networkPath/:amountPath" element={<RenderWalletComponent />} />
          <Route path=":networkPath/:assetPath" element={<RenderWalletComponent />} />
          <Route path=":networkPath/:assetPath/:amountPath" element={<RenderWalletComponent />} />
        </Route>
    </Routes>
  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();