import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Buffer } from 'buffer'
// window.Buffer = Buffer
import process from 'process'
window.process = process

declare global {
  interface Window {
    process: typeof process
  }
}

window.process = process


import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
