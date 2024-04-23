import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx'
import { OnboardModal, LoginRegisterModal } from './components';
import { GameModes, ArenaHome, BattlePage } from './pages';
import './index.css'

import { GlobalContextProvider } from './context/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal/>
      <LoginRegisterModal/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game-modes' element={<GameModes />} />
          <Route path='/arena/:mode' element={<ArenaHome />}></Route>
          <Route path='/arena/:mode/battle/:battlename' element={<BattlePage />}></Route>
        </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
)
