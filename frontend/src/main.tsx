import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import App from './App'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
