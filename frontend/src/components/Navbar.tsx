import { useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Stack, Box } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import HotelIcon from '@mui/icons-material/Hotel'
import { toggleTheme as toggleThemeAction, selectTheme, THEME_KEY } from '../store/themeSlice'
import { useAppDispatch, useAppSelector } from '../store'

export default function Navbar() {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto' }}>
        <HotelIcon sx={{ mr: 1 }} color="primary" />
        <Typography
          variant="h6"
          component="a"
          href="/"
          fontWeight={700}
          fontStyle="italic"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Hotel.com
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button href="/hotels" color="inherit">Hotels</Button>
          <Button href="/flights" color="inherit">Flights</Button>
          <Button href="/contact" color="inherit">Contact</Button>

          <Box sx={{ ml: 1 }}>
            <IconButton
              onClick={() => dispatch(toggleThemeAction())}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              color="inherit"
            >
              {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
