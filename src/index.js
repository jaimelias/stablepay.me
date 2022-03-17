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
  const {walletParam} = params;
  
  console.log(params);

  return (
      <>
        {walletParam ? <>
          
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
        <Route path=":walletParam" element={<App />} >
          <Route index element={<RenderWalletComponent />} />
          <Route path=":networkParam" element={<RenderWalletComponent />} />
          <Route path=":networkParam/:assetParam" element={<RenderWalletComponent />} />
          <Route path=":networkParam/:assetParam/:amountParam" element={<RenderWalletComponent />} />
        </Route>
    </Routes>
  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();