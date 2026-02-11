import { createSlice } from '@reduxjs/toolkit'

const THEME_KEY = 'hotel-theme'

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: getInitialTheme() },
  reducers: {
    setTheme: (state, action) => {
      const next = action.payload
      if (next === 'light' || next === 'dark') state.value = next
    },
    toggleTheme: (state) => {
      state.value = state.value === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export const selectTheme = (state) => state.theme.value
export { THEME_KEY }
export default themeSlice.reducer
