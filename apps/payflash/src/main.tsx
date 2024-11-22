import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Root/App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Root'
import { GoogleAuthProvider } from '@my-monorepo/ui'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleAuthProvider clientId='36767143730-u224jclh8aailtdo1tabmeo86u6lr075.apps.googleusercontent.com'>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleAuthProvider>
  </StrictMode>,
)
