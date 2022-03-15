import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {HomePage} from './components/HomePageComponent';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import {MainComponent} from './MainComponent';
import WalletComponent from './components/WalletComponent';

const RenderWalletComponent = props => {
  const {walletPath = '', networkPath = '', assetPath = '', amountPath = ''} = useParams();
  return <WalletComponent {...props} walletPath={walletPath} networkPath={networkPath} assetPath={assetPath} amountPath={amountPath} />
};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path=":walletPath/" element={<MainComponent />} >
          <Route index element={<RenderWalletComponent />} />  
          <Route path=":networkPath/" element={<RenderWalletComponent />} >
            <Route index element={<RenderWalletComponent />} />  
            <Route path=":amountPath" element={<RenderWalletComponent />} />
            <Route path=":assetPath/:amountPath" element={<RenderWalletComponent />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();