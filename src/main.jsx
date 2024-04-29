import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx'
import { OnboardModal, LoginRegisterModal, LobbyModal } from './components';
import { GameModes, ArenaHome, BattlePage, MarketPlace } from './pages';
import './index.css'

import { GlobalContextProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal/>
      <LoginRegisterModal/>
      <LobbyModal/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game-modes' element={<GameModes />} />
        <Route path='/market-place' element={<MarketPlace />} />
        <Route path='/arena/:mode' element={<ArenaHome />}></Route>
        <Route path='/arena/:mode/battle/:battlename' element={<BattlePage />}></Route>
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
)
