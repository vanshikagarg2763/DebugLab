import {BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChallengePage from './pages/ChallengePage'
import DashboardPage from './pages/DashboardPage'
import './App.css'
import Navbar from './components/Navbar'
import ChallengeDetailsPage from './pages/ChallengeDetailsPage'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/challenges' element={<ChallengePage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/challenge/:challengeId' element={<ChallengeDetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
