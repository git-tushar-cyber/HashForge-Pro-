import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './editor.css'
import './live.css'
import './editor-overrides.css'
import './website-motion.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
