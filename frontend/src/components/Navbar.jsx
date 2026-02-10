import { useState, useEffect } from 'react'
import './Navbar.css'

const THEME_KEY = 'hotel-theme'

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__start">
          <a href="/" className="navbar__brand">
          <svg className="navbar__brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 21h18M5 21V9l7-4 7 4v12M9 21v-6h6v6M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
          </svg>
          <span>Hotel.com</span>
          </a>
        </div>
        <div className="navbar__end">
          <ul className="navbar__links">
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/flights">Flights</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <button
            type="button"
            className="navbar__theme-toggle theme-slide"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            data-theme={theme}
          >
            <span className="theme-slide__track">
              <svg className="theme-slide__icon theme-slide__icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span className="theme-slide__thumb" />
              <svg className="theme-slide__icon theme-slide__icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
