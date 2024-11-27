import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Root/App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Root'
import { GoogleAuthProvider } from '@my-monorepo/ui'
import {appConstant} from '@my-monorepo/payflash/Constants'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleAuthProvider clientId={appConstant.googleClientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleAuthProvider>
  </StrictMode>,
)
