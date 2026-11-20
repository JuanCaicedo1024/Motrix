import { createRoot } from 'react-dom/client'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
import '@fontsource/oxanium/latin-600.css'
import '@fontsource/oxanium/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-600.css'
import './styles/globals.css'
import App from './App'

createRoot(document.getElementById('root')!).render(<App />)
