import { ManagementLayout } from '@my-monorepo/management/Layouts'
import { ManagementBrowserRouter } from '@my-monorepo/management/Routes'


function App() {

  return (
    <ManagementBrowserRouter>
      <ManagementLayout />
    </ManagementBrowserRouter>
  )
}

export default App
