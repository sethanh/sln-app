import { createRoot } from 'react-dom/client'
import App from './Root/App.tsx'
import './index.css'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <GoogleAuthProvider clientId={appConstant.googleClientId}>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </GoogleAuthProvider>
  // </StrictMode>,
  <App/>,
)
