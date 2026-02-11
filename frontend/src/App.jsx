import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Hotels from './pages/Hotels'

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
