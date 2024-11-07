import { ManagementLayout } from '@my-monorepo/management/layouts'
import { ManagementBrowserRouter } from '@my-monorepo/management/routes'


function App() {
    
  return (
        <ManagementBrowserRouter>
            <ManagementLayout />
        </ManagementBrowserRouter>
  )
}

export default App
