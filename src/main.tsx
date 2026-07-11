import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const root = document.getElementById('root')!

// Produktionsbygget innehåller en statisk HTML-version för sökmotorer och
// snabba förhandsvisningar. React ersätter den med den interaktiva appen.
root.replaceChildren()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
