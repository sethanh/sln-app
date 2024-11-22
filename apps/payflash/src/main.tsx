import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Root/App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Root'
import { GoogleAuthProvider } from '@my-monorepo/ui'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleAuthProvider clientId='603483609469-fj9dtrcaoecgh3ar6bpvhs1caetmm3t9.apps.googleusercontent.com'>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleAuthProvider>
  </StrictMode>,
)
