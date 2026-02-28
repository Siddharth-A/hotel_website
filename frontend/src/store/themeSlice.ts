import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

export interface ThemeState {
  value: Theme
}

export const THEME_KEY = 'hotel-theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: getInitialTheme() } as ThemeState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      const next = action.payload
      if (next === 'light' || next === 'dark') state.value = next
    },
    toggleTheme: (state) => {
      state.value = state.value === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export const selectTheme = (state: { theme: ThemeState }) => state.theme.value
export default themeSlice.reducer
