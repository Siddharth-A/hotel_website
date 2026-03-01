import { createTheme } from '@mui/material/styles'

const shared = {
  typography: {
    fontFamily: "'Poppins', system-ui, -apple-system, sans-serif",
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none' as const, fontWeight: 600 } },
    },
  },
}

export const lightTheme = createTheme({
  ...shared,
  palette: {
    mode: 'light',
    primary: { main: '#db2777' },
    secondary: { main: '#f472b6' },
    background: { default: '#ffffff', paper: '#f9f9f9' },
    text: { primary: '#213547', secondary: '#666' },
  },
})

export const darkTheme = createTheme({
  ...shared,
  palette: {
    mode: 'dark',
    primary: { main: '#ec4899' },
    secondary: { main: '#f472b6' },
    background: { default: '#242424', paper: '#1a1a1a' },
    text: { primary: 'rgba(255,255,255,0.87)', secondary: '#888' },
  },
})
