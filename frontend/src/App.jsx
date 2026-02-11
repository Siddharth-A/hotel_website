import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Home from './Home'

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
