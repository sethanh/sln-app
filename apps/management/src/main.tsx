import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Root/App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import {store} from './Root/Store/index.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
