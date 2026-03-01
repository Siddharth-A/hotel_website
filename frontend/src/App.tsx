import { useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useAppSelector } from './store'
import { selectTheme } from './store/themeSlice'
import { lightTheme, darkTheme } from './theme'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Hotels from './pages/Hotels'
import Flights from './pages/Flights'

function App() {
  const mode = useAppSelector(selectTheme)
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
