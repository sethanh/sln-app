import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ManagementRootContext } from './Contexts'
import './index.css'
import { ContextRoot } from './Constants'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ManagementRootContext 
      Context={ContextRoot}
    >
      <App />
    </ManagementRootContext>
  </StrictMode>,
)
