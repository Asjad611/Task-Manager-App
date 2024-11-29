import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocaleProvider } from './LocaleStorage/LocaleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
    <App />
    </LocaleProvider>
  </StrictMode>,
)
