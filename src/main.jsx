import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx'
import { OnboardModal, LoginRegisterModal } from './components';
import './index.css'

import { GlobalContextProvider } from './context/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal/>
      <LoginRegisterModal/>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
)
